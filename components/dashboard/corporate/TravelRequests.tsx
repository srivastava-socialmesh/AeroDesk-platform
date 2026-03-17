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
import { Eye, CheckCircle, XCircle } from 'lucide-react'

const travelRequests = [
  {
    id: 'TR001',
    employee: 'Rahul Sharma',
    department: 'Sales',
    route: 'Mumbai → Delhi',
    date: '2024-03-25',
    passengers: 2,
    amount: 45000,
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'TR002',
    employee: 'Priya Patel',
    department: 'Finance',
    route: 'Delhi → Bangalore',
    date: '2024-03-27',
    passengers: 1,
    amount: 38000,
    status: 'manager_approved',
    priority: 'medium',
  },
  {
    id: 'TR003',
    employee: 'Anand Menon',
    department: 'Operations',
    route: 'Mumbai → Goa',
    date: '2024-03-28',
    passengers: 4,
    amount: 125000,
    status: 'finance_approved',
    priority: 'low',
  },
  {
    id: 'TR004',
    employee: 'Neha Gupta',
    department: 'Executive',
    route: 'Delhi → Mumbai',
    date: '2024-03-29',
    passengers: 1,
    amount: 42000,
    status: 'pending',
    priority: 'urgent',
  },
  {
    id: 'TR005',
    employee: 'Vikram Singh',
    department: 'Sales',
    route: 'Bangalore → Chennai',
    date: '2024-03-30',
    passengers: 2,
    amount: 32000,
    status: 'rejected',
    priority: 'low',
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  manager_approved: 'bg-blue-100 text-blue-800',
  finance_approved: 'bg-purple-100 text-purple-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-100 text-red-800',
  high: 'bg-orange-100 text-orange-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
}

export function TravelRequests() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50">
            All Requests
          </Badge>
          <Badge variant="outline" className="bg-yellow-50">
            Pending: {travelRequests.filter(r => r.status === 'pending').length}
          </Badge>
          <Badge variant="outline" className="bg-green-50">
            Approved: {travelRequests.filter(r => r.status.includes('approved')).length}
          </Badge>
        </div>
        <Button size="sm">+ New Request</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request ID</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {travelRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.id}</TableCell>
              <TableCell>{request.employee}</TableCell>
              <TableCell>{request.department}</TableCell>
              <TableCell>{request.route}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>₹{request.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={statusColors[request.status]}>
                  {request.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={priorityColors[request.priority]}>
                  {request.priority.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {request.status === 'pending' && (
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