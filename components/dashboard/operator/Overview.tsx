'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plane, Users, Calendar, TrendingUp } from 'lucide-react'

export function Overview() {
  // This would typically come from your API/database
  const stats = [
    {
      title: 'Total Flights',
      value: '156',
      change: '+12%',
      icon: Plane,
      color: 'blue',
    },
    {
      title: 'Active Crew',
      value: '48',
      change: '+4',
      icon: Users,
      color: 'green',
    },
    {
      title: 'Upcoming Trips',
      value: '23',
      change: '+8',
      icon: Calendar,
      color: 'purple',
    },
    {
      title: 'Utilization Rate',
      value: '78%',
      change: '+5%',
      icon: TrendingUp,
      color: 'orange',
    },
  ]

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Operator Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Plane className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Flight to Delhi</p>
                    <p className="text-sm text-gray-500">Departure: 2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Completed</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
