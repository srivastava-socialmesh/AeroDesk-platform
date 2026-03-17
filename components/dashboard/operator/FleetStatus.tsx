'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plane, Wrench, Clock } from 'lucide-react'

const fleet = [
  {
    id: 'AC001',
    registration: 'VT-JSD',
    type: 'Challenger 850',
    capacity: 12,
    status: 'available',
    location: 'Mumbai (BOM)',
    nextMaintenance: '2024-04-15',
    utilization: 78,
  },
  {
    id: 'AC002',
    registration: 'VT-JSE',
    type: 'Gulfstream G650',
    capacity: 16,
    status: 'in_charter',
    location: 'Delhi (DEL)',
    nextMaintenance: '2024-05-20',
    utilization: 92,
  },
  {
    id: 'AC003',
    registration: 'VT-JSF',
    type: 'Cessna Citation',
    capacity: 8,
    status: 'maintenance',
    location: 'Bangalore (BLR)',
    nextMaintenance: '2024-03-22',
    utilization: 45,
  },
  {
    id: 'AC004',
    registration: 'VT-JSG',
    type: 'Bombardier Global',
    capacity: 14,
    status: 'available',
    location: 'Chennai (MAA)',
    nextMaintenance: '2024-06-10',
    utilization: 67,
  },
]

const statusColors: Record<string, string> = {
  available: 'bg-green-100 text-green-800',
  in_charter: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  aog: 'bg-red-100 text-red-800',
}

export function FleetStatus() {
  return (
    <div className="space-y-4">
      {fleet.map((aircraft) => (
        <Card key={aircraft.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">{aircraft.registration}</h4>
                  <p className="text-sm text-gray-500">{aircraft.type}</p>
                </div>
              </div>
              <Badge className={statusColors[aircraft.status]}>
                {aircraft.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{aircraft.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Capacity</p>
                <p className="text-sm font-medium">{aircraft.capacity} pax</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Next Maintenance</p>
                <div className="flex items-center space-x-1">
                  <Wrench className="h-3 w-3 text-gray-400" />
                  <p className="text-sm font-medium">{aircraft.nextMaintenance}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Utilization</p>
                <div className="flex items-center space-x-2">
                  <Progress value={aircraft.utilization} className="h-2 w-20" />
                  <span className="text-sm font-medium">{aircraft.utilization}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View Details
              </button>
              {aircraft.status === 'available' && (
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Create Empty Leg
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}