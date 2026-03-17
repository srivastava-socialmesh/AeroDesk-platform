import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Overview } from '@/components/dashboard/operator/Overview'
import { FleetStatus } from '@/components/dashboard/operator/FleetStatus'
import { PendingRequests } from '@/components/dashboard/operator/PendingRequests'
import { RecentEmptyLegs } from '@/components/dashboard/operator/RecentEmptyLegs'

export const metadata: Metadata = {
  title: 'Operator Dashboard | AeroDesk',
  description: 'Manage your fleet and operations',
}

export default function OperatorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Operator Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your fleet, crew, and operations
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Aircraft</CardTitle>
            <div className="text-2xl">✈️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crew</CardTitle>
            <div className="text-2xl">👨‍✈️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 pilots, 16 crew</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empty Legs</CardTitle>
            <div className="text-2xl">🪑</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 active, 5 scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <div className="text-2xl">📋</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Fleet Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <FleetStatus />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <PendingRequests />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Empty Legs</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentEmptyLegs />
        </CardContent>
      </Card>
    </div>
  )
}