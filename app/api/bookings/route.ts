import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const type = searchParams.get('type') // 'charter' | 'seat' | 'hotel'

  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let data = []

    if (type === 'charter' || !type) {
      const { data: charterBookings } = await supabase
        .from('charter_rfqs')
        .select('*')
        .eq('customerId', userId || user.id)
        .in('status', ['confirmed', 'completed', 'in_progress'])
      data = [...data, ...(charterBookings || [])]
    }

    if (type === 'seat' || !type) {
      const { data: seatBookings } = await supabase
        .from('seat_bookings')
        .select(`
          *,
          empty_leg:empty_legs(*)
        `)
        .eq('userId', userId || user.id)
      data = [...data, ...(seatBookings || [])]
    }

    if (type === 'hotel' || !type) {
      const { data: hotelBookings } = await supabase
        .from('hotel_bookings')
        .select(`
          *,
          hotel:hotels(*)
        `)
        .eq('userId', userId || user.id)
      data = [...data, ...(hotelBookings || [])]
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const body = await request.json()
    const { type, ...bookingData } = body

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let result

    switch (type) {
      case 'seat':
        // Check seat availability
        const { data: emptyLeg } = await supabase
          .from('empty_legs')
          .select('availableSeats')
          .eq('id', bookingData.emptyLegId)
          .single()

        if (!emptyLeg || emptyLeg.availableSeats < bookingData.seats) {
          return NextResponse.json(
            { error: 'Not enough seats available' },
            { status: 400 }
          )
        }

        // Create seat booking
        result = await supabase
          .from('seat_bookings')
          .insert([
            {
              ...bookingData,
              userId: user.id,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          ])
          .select()
          .single()

        // Update available seats
        await supabase
          .from('empty_legs')
          .update({
            availableSeats: emptyLeg.availableSeats - bookingData.seats,
          })
          .eq('id', bookingData.emptyLegId)
        break

      case 'hotel':
        result = await supabase
          .from('hotel_bookings')
          .insert([
            {
              ...bookingData,
              userId: user.id,
              status: 'pending',
              createdAt: new Date().toISOString(),
            },
          ])
          .select()
          .single()
        break

      default:
        return NextResponse.json(
          { error: 'Invalid booking type' },
          { status: 400 }
        )
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ data: result.data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}