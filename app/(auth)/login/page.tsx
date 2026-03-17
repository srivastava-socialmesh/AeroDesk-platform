'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signIn } = useAuth()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await signIn(data.email, data.password)
      toast.success('Login successful! Redirecting...')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Demo credentials for testing
  const fillDemoCredentials = (role: string) => {
    const demos: Record<string, { email: string; password: string }> = {
      admin: { email: 'admin@aerodesk.com', password: 'demo123' },
      operator: { email: 'operator@aerodesk.com', password: 'demo123' },
      corporate: { email: 'corporate@aerodesk.com', password: 'demo123' },
      agency: { email: 'agency@aerodesk.com', password: 'demo123' },
      hotel: { email: 'hotel@aerodesk.com', password: 'demo123' },
      customer: { email: 'customer@aerodesk.com', password: 'demo123' },
    }
    
    const demo = demos[role]
    if (demo) {
      const emailInput = document.getElementById('email') as HTMLInputElement
      const passwordInput = document.getElementById('password') as HTMLInputElement
      if (emailInput && passwordInput) {
        emailInput.value = demo.email
        passwordInput.value = demo.password
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AD</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to AeroDesk</CardTitle>
          <CardDescription>
            Sign in to access your aviation marketplace dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                error={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                error={!!errors.password}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Quick Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Quick Login</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fillDemoCredentials('admin')}
              >
                Admin
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fillDemoCredentials('operator')}
              >
                Operator
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fillDemoCredentials('corporate')}
              >
                Corporate
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fillDemoCredentials('agency')}
              >
                Agency
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fillDemoCredentials('hotel')}
              >
                Hotel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fillDemoCredentials('customer')}
              >
                Customer
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}