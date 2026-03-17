'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

const budgetData = {
  total: 50000000,
  used: 18200000,
  remaining: 31800000,
  monthly: [
    { month: 'Jan', budget: 4000000, spent: 3200000 },
    { month: 'Feb', budget: 4000000, spent: 3800000 },
    { month: 'Mar', budget: 4500000, spent: 4200000 },
    { month: 'Apr', budget: 4500000, spent: 4100000 },
    { month: 'May', budget: 4500000, spent: 3900000 },
    { month: 'Jun', budget: 4500000, spent: 4300000 },
  ],
  departments: [
    { name: 'Sales', allocated: 15000000, spent: 11200000, remaining: 3800000 },
    { name: 'Operations', allocated: 12000000, spent: 8900000, remaining: 3100000 },
    { name: 'Executive', allocated: 18000000, spent: 14500000, remaining: 3500000 },
    { name: 'Finance', allocated: 5000000, spent: 3600000, remaining: 1400000 },
  ],
  alerts: [
    { dept: 'Sales', message: 'Budget utilization at 75%', severity: 'warning' },
    { dept: 'Executive', message: 'Exceeding monthly average', severity: 'critical' },
  ],
}

export function BudgetOverview() {
  const usagePercentage = (budgetData.used / budgetData.total) * 100

  return (
    <div className="space-y-6">
      {/* Overall Budget Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Annual Budget</p>
              <Wallet className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-bold">₹{(budgetData.total / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-1">Total allocated for FY 2024-25</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Used</p>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">₹{(budgetData.used / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-1">{usagePercentage.toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Remaining</p>
              <TrendingDown className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">₹{(budgetData.remaining / 100000).toFixed(1)}L</p>
            <p className="text-xs text-gray-500 mt-1">{(100 - usagePercentage).toFixed(1)}% remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Budget Utilization</h3>
            <Badge variant="outline" className={usagePercentage > 80 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}>
              {usagePercentage > 80 ? '⚠️ Near Limit' : '✓ On Track'}
            </Badge>
          </div>
          <Progress value={usagePercentage} className="h-3" />
          <div className="flex justify-between text-sm mt-2">
            <span>Used: ₹{(budgetData.used / 100000).toFixed(1)}L</span>
            <span>Remaining: ₹{(budgetData.remaining / 100000).toFixed(1)}L</span>
          </div>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Department Budget Breakdown</h3>
          <div className="space-y-4">
            {budgetData.departments.map((dept) => {
              const deptUsage = (dept.spent / dept.allocated) * 100
              return (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        ₹{(dept.spent / 100000).toFixed(1)}L / ₹{(dept.allocated / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      deptUsage > 80 ? 'text-red-600' : deptUsage > 60 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {deptUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={deptUsage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Monthly Spend Trend</h3>
          <div className="space-y-3">
            {budgetData.monthly.map((month) => (
              <div key={month.month} className="flex items-center space-x-4">
                <span className="w-12 text-sm font-medium">{month.month}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(month.spent / month.budget) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-24">
                      ₹{(month.spent / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      {budgetData.alerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Budget Alerts</h3>
            </div>
            <div className="space-y-2">
              {budgetData.alerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-yellow-800">{alert.dept}:</span>
                  <span className="text-yellow-700">{alert.message}</span>
                  <Badge className={alert.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}