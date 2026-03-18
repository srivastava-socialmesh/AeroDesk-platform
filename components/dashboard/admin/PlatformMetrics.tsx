'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Plane, Hotel, Wallet, TrendingUp, Activity } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down' | 'neutral'
}

function MetricCard({ title, value, change, icon, trend }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-yellow-600',
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColors[trend]} flex items-center mt-1`}>
          {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

export function PlatformMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Users"
        value="24,891"
        change="+12.3% from last month"
        icon={<Users className="h-4 w-4" />}
        trend="up"
      />
      <MetricCard
        title="Active Operators"
        value="156"
        change="+8 new this month"
        icon={<Plane className="h-4 w-4" />}
        trend="up"
      />
      <MetricCard
        title="Hotel Partners"
        value="342"
        change="+23 from last quarter"
        icon={<Hotel className="h-4 w-4" />}
        trend="up"
      />
      <MetricCard
        title="Monthly Revenue"
        value="₹2.4Cr"
        change="+15.2% from last month"
        icon={<Wallet className="h-4 w-4" />}
        trend="up"
      />
      <MetricCard
        title="Active Bookings"
        value="1,284"
        change="+124 this week"
        icon={<Activity className="h-4 w-4" />}
        trend="up"
      />
      <MetricCard
        title="Platform Health"
        value="99.9%"
        change="All systems operational"
        icon={<TrendingUp className="h-4 w-4" />}
        trend="neutral"
      />
      <MetricCard
        title="Avg Response Time"
        value="2.4s"
        change="-0.3s from last week"
        icon={<Activity className="h-4 w-4" />}
        trend="up"
      />
      <MetricCard
        title="Pending Approvals"
        value="23"
        change="+5 since yesterday"
        icon={<Users className="h-4 w-4" />}
        trend="down"
      />
    </div>
  )
}
