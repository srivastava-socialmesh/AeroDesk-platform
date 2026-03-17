'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, MapPin, Users, Bed, Edit, Trash2 } from 'lucide-react'

const properties = [
  {
    id: 1,
    name: 'Taj Mahal Palace',
    location: 'Mumbai, Maharashtra',
    rooms: 285,
    occupancy: 82,
    status: 'active',
    rating: 5,
    image: '🏨',
  },
  {
    id: 2,
    name: 'The Oberoi',
    location: 'Delhi, NCR',
    rooms: 220,
    occupancy: 78,
    status: 'active',
    rating: 5,
    image: '🏨',
  },
  {
    id: 3,
    name: 'ITC Gardenia',
    location: 'Bangalore, Karnataka',
    rooms: 298,
    occupancy: 91,
    status: 'active',
    rating: 5,
    image: '🏨',
  },
  {
    id: 4,
    name: 'Taj Coromandel',
    location: 'Chennai, Tamil Nadu',
    rooms: 210,
    occupancy: 67,
    status: 'maintenance',
    rating: 4,
    image: '🏨',
  },
  {
    id: 5,
    name: 'The Leela Palace',
    location: 'Jaipur, Rajasthan',
    rooms: 185,
    occupancy: 73,
    status: 'active',
    rating: 5,
    image: '🏨',
  },
]

export function PropertyList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Properties</h3>
        <Button size="sm" className="bg-blue-600">
          + Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    {property.image}
                  </div>
                  <div>
                    <h4 className="font-semibold">{property.name}</h4>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className={property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {property.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Total Rooms</p>
                  <div className="flex items-center space-x-1">
                    <Bed className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{property.rooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Occupancy</p>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{property.occupancy}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{property.rating}.0</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button size="sm" className="bg-blue-600">
                  Manage Rooms
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}