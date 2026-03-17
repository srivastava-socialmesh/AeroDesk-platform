'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react'

const bookingRequests = [
  {
    id: 'BR001',
    guest: 'John Smith',
    property: 'Taj Mahal Palace',
    roomType: 'Deluxe Suite',
    checkIn: '2024-03-25',
    checkOut: '2024-03-28',
    guests: 2,
    amount: 45000,
    status: 'pending',
    specialRequests: 'Early check-in requested',
  },
  {
    id: 'BR002',
    guest: 'Sarah Chen',
    property: 'The Oberoi',
    roomType: 'Executive Room',
    checkIn: '2024-03-26',
    checkOut: '2024-03-29',
    guests: 1,
    amount: 38000,
    status: 'confirmed',
    specialRequests: 'Airport pickup needed',
  },
  {
    id: 'BR003',
    guest: 'Rajesh Kumar',
    property: 'ITC Gardenia',
    roomType: 'Presidential Suite',
    checkIn: '2024-03-27',
    checkOut: '2024-03-30',
    guests: 3,
    amount: 125000,
    status: 'pending',
    specialRequests: 'Charter flight passenger',
  },
  {
    id: 'BR004',
    guest: 'Priya Patel',
    property: 'Taj Coromandel',
    roomType: 'Deluxe Room',
    checkIn: '2024-03-28',
    checkOut: '2024-03-31',
    guests: 2,
    amount: 32000,
    status: 'cancelled',
    specialRequests: 'Vegetarian meals',
  },
  {
    id: 'BR005',
    guest: 'Anand Menon',
    property: 'The Leela Palace',
    roomType: 'Luxury Suite',
    checkIn: '2024-03-29',
    checkOut: '2024-04-02',
    guests: 2,
    amount: 89000,
    status: 'pending',
    specialRequests: 'Late checkout requested',
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
}

export function BookingRequests() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50">
            Total: {bookingRequests.length}
          </Badge>
          <Badge variant="outline" className="bg-yellow-50">
            Pending: {bookingRequests.filter(b => b.status === 'pending').length}
          </Badge>
        </div>
        <select className="text-sm border rounded-md px-2 py-1">
          <option>All Properties</option>
          <option>Taj Mahal Palace</option>
          <option>The Oberoi</option>
          <option>ITC Gardenia</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Check-Out</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingRequests.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.id}</TableCell>
              <TableCell>{booking.guest}</TableCell>
              <TableCell>{booking.property}</TableCell>
              <TableCell>{booking.roomType}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={statusColors[booking.status]}>
                  {booking.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {booking.status === 'pending' && (
                    <>
                      <Button size="sm" variant="ghost" className="text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}