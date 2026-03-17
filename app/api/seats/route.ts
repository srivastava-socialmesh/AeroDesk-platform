import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const date = searchParams.get('date')

  try {
    let query = supabase.from('empty_legs').select(`
      *,
      operator:operators(companyName),
      aircraft:aircraft(type, registration)
    `)

    if (origin) {
      query = query.eq('origin', origin)
    }

    if (destination) {
      query = query.eq('destination', destination)
    }

    if (date) {
      query = query.gte('departureTime', `${date}T00:00:00`)
        .lte('departureTime', `${date}T23:59:59`)
    }

    query = query.eq('status', 'published')
      .gt('availableSeats', 0)
      .order('departureTime', { ascending: true })

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
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
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is an operator
    const { data: operator } = await supabase
      .from('operators')
      .select('id')
      .eq('userId', user.id)
      .single()

    if (!operator) {
      return NextResponse.json(
        { error: 'Only operators can create empty legs' },
        { status: 403 }
      )
    }

    // Create empty leg
    const { data, error } = await supabase
      .from('empty_legs')
      .insert([
        {
          ...body,
          operatorId: operator.id,
          status: 'draft',
          createdAt: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}