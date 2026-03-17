import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TravelRequests } from '@/components/dashboard/corporate/TravelRequests'
import { BudgetOverview } from '@/components/dashboard/corporate/BudgetOverview'
import { ApprovalQueue } from '@/components/dashboard/corporate/ApprovalQueue'
import { TravelAnalytics } from '@/components/dashboard/corporate/TravelAnalytics'

export const metadata: Metadata = {
  title: 'Corporate Dashboard | AeroDesk',
  description: 'Manage corporate travel and approvals',
}

export default function CorporateDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Corporate Travel Desk</h1>
        <p className="text-gray-500 mt-1">
          Manage employee travel requests, approvals, and budgets
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <div className="text-2xl">📋</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+8 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Awaiting Approval</CardTitle>
            <div className="text-2xl">⏳</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
            <div className="text-2xl">💰</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18.2L</div>
            <p className="text-xs text-muted-foreground">of ₹50L annual budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <div className="text-2xl">👥</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Travel Requests</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Travel Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <TravelRequests />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <ApprovalQueue />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetOverview />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Travel Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <TravelAnalytics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}