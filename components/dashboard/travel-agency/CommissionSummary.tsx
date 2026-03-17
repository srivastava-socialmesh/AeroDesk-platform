'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const commissionData = {
  total: 182500,
  pending: 45600,
  paid: 136900,
  projected: 245000,
  monthly: [
    { month: 'Jan', amount: 42500 },
    { month: 'Feb', amount: 56200 },
    { month: 'Mar', amount: 67800 },
    { month: 'Apr', amount: 71200 },
    { month: 'May', amount: 83400 },
    { month: 'Jun', amount: 92500 },
  ],
}

const recentCommissions = [
  {
    id: 'C001',
    booking: 'Seat Booking - MUM→DEL',
    client: 'Rajesh Kumar',
    date: '2024-03-20',
    amount: 4500,
    status: 'paid',
  },
  {
    id: 'C002',
    booking: 'Charter - MUM→GOA',
    client: 'Anand Menon',
    date: '2024-03-19',
    amount: 12500,
    status: 'paid',
  },
  {
    id: 'C003',
    booking: 'Seat Booking - DEL→BLR',
    client: 'Priya Singh',
    date: '2024-03-18',
    amount: 5200,
    status: 'pending',
  },
  {
    id: 'C004',
    booking: 'Hotel Booking - Taj',
    client: 'Neha Gupta',
    date: '2024-03-17',
    amount: 3800,
    status: 'paid',
  },
  {
    id: 'C005',
    booking: 'Seat Booking - BLR→MAA',
    client: 'Vikram Singh',
    date: '2024-03-16',
    amount: 3200,
    status: 'pending',
  },
]

export function CommissionSummary() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Commission</p>
                <p className="text-2xl font-bold">₹{commissionData.total.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">₹{commissionData.pending.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-2xl font-bold text-green-600">₹{commissionData.paid.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Projected</p>
                <p className="text-2xl font-bold text-purple-600">₹{commissionData.projected.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Monthly Commission Trend</h3>
            <div className="space-y-3">
              {commissionData.monthly.map((item) => (
                <div key={item.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.month}</span>
                  <div className="flex items-center space-x-4 flex-1 ml-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(item.amount / 100000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">₹{item.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Recent Commissions</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCommissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.booking}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={item.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}