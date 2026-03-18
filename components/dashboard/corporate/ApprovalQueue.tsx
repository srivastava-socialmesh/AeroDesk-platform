'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

const approvalQueue = [
  {
    id: 'AP001',
    employee: 'Rahul Sharma',
    department: 'Sales',
    requestType: 'Charter Flight',
    route: 'Mumbai → Delhi',
    date: '2024-03-25',
    amount: 45000,
    priority: 'high',
    submittedAt: '2 hours ago',
    avatar: 'RS',
    justification: 'Client meeting with potential investor',
  },
  {
    id: 'AP002',
    employee: 'Priya Patel',
    department: 'Finance',
    requestType: 'Jet Seat',
    route: 'Delhi → Bangalore',
    date: '2024-03-27',
    amount: 38000,
    priority: 'medium',
    submittedAt: '5 hours ago',
    avatar: 'PP',
    justification: 'Quarterly financial audit',
  },
  {
    id: 'AP003',
    employee: 'Anand Menon',
    department: 'Operations',
    requestType: 'Charter Flight',
    route: 'Mumbai → Goa',
    date: '2024-03-28',
    amount: 125000,
    priority: 'urgent',
    submittedAt: '30 min ago',
    avatar: 'AM',
    justification: 'Emergency site visit',
  },
  {
    id: 'AP004',
    employee: 'Neha Gupta',
    department: 'Executive',
    requestType: 'Hotel Booking',
    route: 'Taj Palace, Delhi',
    date: '2024-03-26',
    amount: 42000,
    priority: 'low',
    submittedAt: '1 day ago',
    avatar: 'NG',
    justification: 'Board member accommodation',
  },
]

type priority ='urgent' | 'high' | 'medium' | 'low'

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
}

export function ApprovalQueue() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50">
            Total: {approvalQueue.length}
          </Badge>
          <Badge variant="outline" className="bg-red-50">
            Urgent: {approvalQueue.filter(a => a.priority === 'urgent').length}
          </Badge>
        </div>
        <select className="text-sm border rounded-md px-2 py-1">
          <option>All Departments</option>
          <option>Sales</option>
          <option>Finance</option>
          <option>Operations</option>
          <option>Executive</option>
        </select>
      </div>

      <div className="space-y-4">
        {approvalQueue.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{item.employee}</h4>
                      <Badge className={priorityColors[item.priority]}>
                        {item.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{item.department} • {item.requestType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">₹{item.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Request {item.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">Route</p>
                  <p className="text-sm font-medium">{item.route}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium">{item.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Business Justification</p>
                  <p className="text-sm">{item.justification}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Submitted {item.submittedAt}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
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

              {item.priority === 'urgent' && (
                <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">This request requires immediate attention</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
