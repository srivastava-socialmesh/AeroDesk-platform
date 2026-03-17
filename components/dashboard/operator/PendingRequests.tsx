'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle } from 'lucide-react'

const requests = [
  {
    id: 'SR001',
    flight: 'Mumbai → Delhi',
    date: '2024-03-25',
    requester: 'Rajesh Kumar',
    seats: 2,
    amount: 90000,
    status: 'pending',
    time: '10 min ago',
  },
  {
    id: 'SR002',
    flight: 'Delhi → Bangalore',
    date: '2024-03-26',
    requester: 'Priya Singh',
    seats: 3,
    amount: 156000,
    status: 'pending',
    time: '25 min ago',
  },
  {
    id: 'SR003',
    flight: 'Mumbai → Goa',
    date: '2024-03-27',
    requester: 'Anand Menon',
    seats: 1,
    amount: 38000,
    status: 'pending',
    time: '1 hour ago',
  },
]

export function PendingRequests() {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-yellow-50">
                {request.id}
              </Badge>
              <span className="text-xs text-gray-500">{request.time}</span>
            </div>
            <div>
              <p className="font-medium">{request.flight}</p>
              <p className="text-sm text-gray-600">{request.date}</p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span>{request.requester}</span>
              <span>•</span>
              <span>{request.seats} seats</span>
              <span>•</span>
              <span className="font-semibold">₹{request.amount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="text-red-600">
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}