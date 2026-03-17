'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const activities = [
  {
    id: 1,
    user: 'John Smith',
    action: 'created a new charter RFQ',
    target: 'Mumbai → Delhi',
    time: '2 minutes ago',
    avatar: 'JS',
    type: 'rfq',
  },
  {
    id: 2,
    user: 'Delta Air',
    action: 'submitted a quote for',
    target: 'RFQ-2024-0123',
    time: '15 minutes ago',
    avatar: 'DA',
    type: 'quote',
  },
  {
    id: 3,
    user: 'Priya Sharma',
    action: 'registered as new',
    target: 'Corporate Client',
    time: '1 hour ago',
    avatar: 'PS',
    type: 'user',
  },
  {
    id: 4,
    user: 'Taj Hotels',
    action: 'updated room inventory for',
    target: 'Mumbai Property',
    time: '3 hours ago',
    avatar: 'TH',
    type: 'hotel',
  },
  {
    id: 5,
    user: 'System',
    action: 'processed payment for',
    target: 'Invoice INV-2024-089',
    time: '5 hours ago',
    avatar: 'SY',
    type: 'payment',
  },
  {
    id: 6,
    user: 'Rajesh Kumar',
    action: 'requested seat allocation on',
    target: 'Empty Leg EL-2024-056',
    time: '6 hours ago',
    avatar: 'RK',
    type: 'seat',
  },
]

export function RecentActivity() {
  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      rfq: 'bg-blue-100 text-blue-800',
      quote: 'bg-green-100 text-green-800',
      user: 'bg-purple-100 text-purple-800',
      hotel: 'bg-yellow-100 text-yellow-800',
      payment: 'bg-emerald-100 text-emerald-800',
      seat: 'bg-orange-100 text-orange-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className={getActivityColor(activity.type)}>
              {activity.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span>{' '}
              {activity.action}{' '}
              <span className="font-medium text-blue-600">{activity.target}</span>
            </p>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}