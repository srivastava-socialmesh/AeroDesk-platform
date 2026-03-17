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
import { Plane, Clock, MapPin, Users } from 'lucide-react'

const availableSeats = [
  {
    id: 'EL001',
    flight: 'Mumbai → Delhi',
    operator: 'Delta Air',
    departure: '2024-03-25 14:00',
    arrival: '2024-03-25 16:30',
    seats: 8,
    price: 45000,
    aircraft: 'Challenger 850',
  },
  {
    id: 'EL002',
    flight: 'Delhi → Bangalore',
    operator: 'Delta Air',
    departure: '2024-03-26 09:00',
    arrival: '2024-03-26 11:45',
    seats: 10,
    price: 52000,
    aircraft: 'Gulfstream G650',
  },
  {
    id: 'EL003',
    flight: 'Mumbai → Goa',
    operator: 'India Jet',
    departure: '2024-03-27 08:30',
    arrival: '2024-03-27 09:45',
    seats: 6,
    price: 38000,
    aircraft: 'Cessna Citation',
  },
  {
    id: 'EL004',
    flight: 'Bangalore → Chennai',
    operator: 'Bombardier',
    departure: '2024-03-28 15:00',
    arrival: '2024-03-28 16:15',
    seats: 4,
    price: 32000,
    aircraft: 'Bombardier Global',
  },
  {
    id: 'EL005',
    flight: 'Delhi → Mumbai',
    operator: 'Delta Air',
    departure: '2024-03-29 11:00',
    arrival: '2024-03-29 13:30',
    seats: 12,
    price: 48000,
    aircraft: 'Challenger 850',
  },
]

export function AvailableSeats() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50">
            {availableSeats.length} Available Flights
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            Best Prices Guaranteed
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <select className="text-sm border rounded-md px-2 py-1">
            <option>Sort by: Price</option>
            <option>Sort by: Departure</option>
            <option>Sort by: Seats Available</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {availableSeats.map((seat) => (
          <div key={seat.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{seat.flight}</h3>
                  <p className="text-sm text-gray-500">Flight {seat.id} • {seat.operator}</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {seat.seats} seats available
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Departure</p>
                  <p className="text-sm font-medium">{seat.departure}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Arrival</p>
                  <p className="text-sm font-medium">{seat.arrival}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Aircraft</p>
                  <p className="text-sm font-medium">{seat.aircraft}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Price per seat</p>
                <p className="text-2xl font-bold text-blue-600">₹{seat.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm" className="bg-blue-600">
                Book Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}