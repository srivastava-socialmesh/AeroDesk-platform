import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MyTrips } from '@/components/dashboard/customer/MyTrips'
import { CharterRFQ } from '@/components/dashboard/customer/CharterRFQ'
import { SeatBookings } from '@/components/dashboard/customer/SeatBookings'
import { PassengerManifest } from '@/components/dashboard/customer/PassengerManifest'

export const metadata: Metadata = {
  title: 'Customer Dashboard | AeroDesk',
  description: 'Manage your trips and bookings',
}

export default function CustomerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customer Portal</h1>
        <p className="text-gray-500 mt-1">
          Manage your trips, charter requests, and seat bookings
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
            <div className="text-2xl">✈️</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">next on Mar 25</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active RFQs</CardTitle>
            <div className="text-2xl">📝</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">awaiting quotes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seat Bookings</CardTitle>
            <div className="text-2xl">🪑</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">all confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <div className="text-2xl">💰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,52,000</div>
            <p className="text-xs text-muted-foreground">vs commercial flights</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trips" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trips">My Trips</TabsTrigger>
          <TabsTrigger value="rfq">Charter RFQ</TabsTrigger>
          <TabsTrigger value="bookings">Seat Bookings</TabsTrigger>
          <TabsTrigger value="manifest">Passenger Manifest</TabsTrigger>
        </TabsList>

        <TabsContent value="trips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <MyTrips />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Charter Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <CharterRFQ />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seat Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <SeatBookings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manifest" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Passenger Manifest</CardTitle>
            </CardHeader>
            <CardContent>
              <PassengerManifest />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}