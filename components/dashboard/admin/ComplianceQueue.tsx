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
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const complianceItems = [
  {
    id: 1,
    entity: 'Delta Air Charter',
    type: 'Operator',
    gstin: '27AAECS1234F1Z5',
    submittedOn: '2024-03-15',
    status: 'pending',
    risk: 'low',
  },
  {
    id: 2,
    entity: 'Bombardier Executive',
    type: 'Operator',
    gstin: '29AAHPM5678K1Z2',
    submittedOn: '2024-03-14',
    status: 'review',
    risk: 'medium',
  },
  {
    id: 3,
    entity: 'India Jet Charter',
    type: 'Operator',
    gstin: '07AABCI9012L1Z3',
    submittedOn: '2024-03-13',
    status: 'verified',
    risk: 'low',
  },
  {
    id: 4,
    entity: 'Global Travel Agency',
    type: 'Agency',
    gstin: '24AAACG1234F1Z6',
    submittedOn: '2024-03-12',
    status: 'pending',
    risk: 'high',
  },
  {
    id: 5,
    entity: 'Taj Hotels',
    type: 'Hotel',
    gstin: '27AAACT5678K1Z9',
    submittedOn: '2024-03-11',
    status: 'rejected',
    risk: 'medium',
  },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  review: 'bg-orange-100 text-orange-800',
  verified: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

const riskColors: Record<string, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

export function ComplianceQueue() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">GST Verification Queue</h3>
        <Badge variant="outline" className="bg-blue-50">
          {complianceItems.filter(i => i.status === 'pending').length} Pending
        </Badge>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entity</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>GSTIN</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complianceItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.entity}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell className="font-mono text-sm">{item.gstin}</TableCell>
              <TableCell>{item.submittedOn}</TableCell>
              <TableCell>
                <Badge className={statusColors[item.status]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={riskColors[item.risk]}>
                  {item.risk.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {item.status === 'pending' && (
                    <>
                      <Button size="sm" variant="ghost" className="text-green-600">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {item.status === 'review' && (
                    <Button size="sm" variant="outline" className="text-yellow-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Review
                    </Button>
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