'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@/types'

export function useUser(userId?: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        setUser(data as User)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Subscribe to user changes
    const subscription = supabase
      .channel(`user-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          setUser(payload.new as User)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [userId, supabase])

  const updateUser = async (updates: Partial<User>) => {
    if (!userId) throw new Error('User ID is required')

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    setUser(data as User)
    return data
  }

  return {
    user,
    loading,
    error,
    updateUser,
  }
}