import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AvailableSeats } from '@/components/dashboard/travel-agency/AvailableSeats'
import { SeatRequests } from '@/components/dashboard/travel-agency/SeatRequests'
import { CommissionSummary } from '@/components/dashboard/travel-agency/CommissionSummary'
import { ClientActivity } from '@/components/dashboard/travel-agency/ClientActivity'

export const metadata: Metadata = {
  title: 'Travel Agency Dashboard | AeroDesk',
  description: 'Manage seat bookings and client requests',
}

export default function TravelAgencyDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Travel Agency Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage seat allocations, client bookings, and commissions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Seats</CardTitle>
            <div className="text-2xl">🪑</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">on 12 flights</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <div className="text-2xl">📋</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission</CardTitle>
            <div className="text-2xl">💰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,82,500</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <div className="text-2xl">👥</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Seats</TabsTrigger>
          <TabsTrigger value="requests">Seat Requests</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="clients">Client Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Seats Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <AvailableSeats />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seat Allocation Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <SeatRequests />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <CommissionSummary />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientActivity />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}