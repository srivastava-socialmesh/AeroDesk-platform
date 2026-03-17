import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PropertyList } from '@/components/dashboard/hotel/PropertyList'
import { RoomInventory } from '@/components/dashboard/hotel/RoomInventory'
import { BookingRequests } from '@/components/dashboard/hotel/BookingRequests'
import { OccupancyAnalytics } from '@/components/dashboard/hotel/OccupancyAnalytics'

export const metadata: Metadata = {
  title: 'Hotel Dashboard | AeroDesk',
  description: 'Manage properties and accommodation requests',
}

export default function HotelDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hotel Partner Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage your properties, room inventory, and booking requests
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <div className="text-2xl">🏨</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">across 8 cities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <div className="text-2xl">🛏️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+45 this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
            <div className="text-2xl">📊</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+12% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <div className="text-2xl">📋</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">8 urgent</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="inventory">Room Inventory</TabsTrigger>
          <TabsTrigger value="requests">Booking Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <PropertyList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Room Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <RoomInventory />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accommodation Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingRequests />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <OccupancyAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}