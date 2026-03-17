'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard,
  Plane,
  Users,
  Building2,
  Hotel,
  Wallet,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Clock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Briefcase,
  CalendarCheck,
  PlaneTakeoff,
  PlaneLanding,
  Ticket,
  CreditCard,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserRole } from '@/types'

interface SidebarProps {
  role?: UserRole
}

const roleMenus: Record<string, Array<{ name: string; href: string; icon: any }>> = {
  admin: [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Platform Intelligence', href: '/dashboard/admin/intelligence', icon: BarChart3 },
    { name: 'Approvals', href: '/dashboard/admin/approvals', icon: Clock },
    { name: 'User Governance', href: '/dashboard/admin/users', icon: Users },
    { name: 'Operators', href: '/dashboard/admin/operators', icon: Plane },
    { name: 'Partners', href: '/dashboard/admin/partners', icon: Building2 },
    { name: 'Audit Trail', href: '/dashboard/admin/audit', icon: FileText },
    { name: 'Billing', href: '/dashboard/admin/billing', icon: Wallet },
    { name: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ],
  operator: [
    { name: 'Overview', href: '/dashboard/operator', icon: LayoutDashboard },
    { name: 'Fleet Management', href: '/dashboard/operator/fleet', icon: Plane },
    { name: 'Crew Management', href: '/dashboard/operator/crew', icon: Users },
    { name: 'Empty Legs', href: '/dashboard/operator/empty-legs', icon: PlaneTakeoff },
    { name: 'Seat Requests', href: '/dashboard/operator/seat-requests', icon: Ticket },
    { name: 'Charter RFQ', href: '/dashboard/operator/rfq', icon: FileText },
    { name: 'Maintenance', href: '/dashboard/operator/maintenance', icon: AlertCircle },
    { name: 'Revenue', href: '/dashboard/operator/revenue', icon: Wallet },
    { name: 'Analytics', href: '/dashboard/operator/analytics', icon: BarChart3 },
  ],
  corporate: [
    { name: 'Overview', href: '/dashboard/corporate', icon: LayoutDashboard },
    { name: 'Travel Requests', href: '/dashboard/corporate/requests', icon: FileText },
    { name: 'Approvals', href: '/dashboard/corporate/approvals', icon: Clock },
    { name: 'Budgets', href: '/dashboard/corporate/budgets', icon: Wallet },
    { name: 'Cost Centers', href: '/dashboard/corporate/cost-centers', icon: Briefcase },
    { name: 'Policies', href: '/dashboard/corporate/policies', icon: Shield },
    { name: 'Analytics', href: '/dashboard/corporate/analytics', icon: BarChart3 },
  ],
  'travel-agency': [
    { name: 'Overview', href: '/dashboard/travel-agency', icon: LayoutDashboard },
    { name: 'Seat Requests', href: '/dashboard/travel-agency/seat-requests', icon: Ticket },
    { name: 'Available Seats', href: '/dashboard/travel-agency/available-seats', icon: Plane },
    { name: 'Charter Requests', href: '/dashboard/travel-agency/charter-requests', icon: FileText },
    { name: 'Hotel Requests', href: '/dashboard/travel-agency/hotel-requests', icon: Hotel },
    { name: 'Commission', href: '/dashboard/travel-agency/commission', icon: Wallet },
    { name: 'Clients', href: '/dashboard/travel-agency/clients', icon: Users },
    { name: 'Analytics', href: '/dashboard/travel-agency/analytics', icon: BarChart3 },
  ],
  hotel: [
    { name: 'Overview', href: '/dashboard/hotel', icon: LayoutDashboard },
    { name: 'Properties', href: '/dashboard/hotel/properties', icon: Hotel },
    { name: 'Room Inventory', href: '/dashboard/hotel/inventory', icon: Building2 },
    { name: 'Booking Requests', href: '/dashboard/hotel/requests', icon: CalendarCheck },
    { name: 'Current Stays', href: '/dashboard/hotel/stays', icon: Users },
    { name: 'Analytics', href: '/dashboard/hotel/analytics', icon: BarChart3 },
    { name: 'Team', href: '/dashboard/hotel/team', icon: Users },
  ],
  customer: [
    { name: 'Overview', href: '/dashboard/customer', icon: LayoutDashboard },
    { name: 'My Trips', href: '/dashboard/customer/trips', icon: Plane },
    { name: 'Charter RFQ', href: '/dashboard/customer/rfq', icon: FileText },
    { name: 'Seat Bookings', href: '/dashboard/customer/bookings', icon: Ticket },
    { name: 'Passenger Manifest', href: '/dashboard/customer/manifest', icon: Users },
    { name: 'Payment History', href: '/dashboard/customer/payments', icon: CreditCard },
  ],
}

export function Sidebar({ role = 'customer' }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const menuItems = roleMenus[role] || roleMenus.customer

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div 
      className={cn(
        'bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Logo */}
      <div className={cn('p-6 border-b', collapsed ? 'px-4' : '')}>
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AD</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold">
              Aero<span className="text-blue-600">Desk</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group',
                collapsed ? 'justify-center' : '',
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className={cn('h-5 w-5', isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700')} />
              {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Menu */}
      <div className={cn('p-4 border-t', collapsed ? 'px-2' : '')}>
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'space-x-3')}>
          <Avatar className="h-10 w-10 border-2 border-blue-100">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-blue-600 text-white">
              {getInitials('AeroDesk User')}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">AeroDesk User</p>
              <p className="text-xs text-gray-500 capitalize truncate">{role.replace('-', ' ')}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button 
            variant="ghost" 
            className="w-full mt-4 justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              // Handle logout
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}