'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plane, Calendar, Users, MapPin, Clock } from 'lucide-react'

const trips = [
  {
    id: 'TRIP001',
    flight: 'Mumbai → Delhi',
    date: '2024-03-25',
    time: '14:00',
    aircraft: 'Challenger 850',
    seats: 8,
    status: 'confirmed',
    pnr: 'ABC123',
  },
  {
    id: 'TRIP002',
    flight: 'Delhi → Bangalore',
    date: '2024-03-28',
    time: '09:00',
    aircraft: 'Gulfstream G650',
    seats: 4,
    status: 'pending',
    pnr: 'DEF456',
  },
  {
    id: 'TRIP003',
    flight: 'Mumbai → Goa',
    date: '2024-04-05',
    time: '08:30',
    aircraft: 'Cessna Citation',
    seats: 6,
    status: 'confirmed',
    pnr: 'GHI789',
  },
]

export function MyTrips() {
  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <Card key={trip.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{trip.flight}</h3>
                  <p className="text-sm text-gray-500">PNR: {trip.pnr} • {trip.aircraft}</p>
                </div>
              </div>
              <Badge className={trip.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {trip.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium">{trip.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium">{trip.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Seats</p>
                  <p className="text-sm font-medium">{trip.seats}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm" className="bg-blue-600">
                  Manage
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Departure: Mumbai (BOM)</span>
              </div>
              <div>→</div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Arrival: Delhi (DEL)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}