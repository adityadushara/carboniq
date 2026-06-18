"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, session: null, loading: true })

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  // Add supabase client directly inside useEffect to fix exhaustive-deps warning, or leave it outside but ignore warning. We'll leave it outside to avoid recreate.
  const supabase = createClient()

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user || null)
      setLoading(false)
    }

    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loading && !user && pathname !== '/login' && pathname !== '/signup' && pathname !== '/') {
      router.push('/login')
    } else if (!loading && user && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
      router.push('/dashboard')
    }
  }, [user, loading, pathname, router])

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Loading CarbonIQ...</p>
          </div>
        </div>
      ) : (
        pathname === '/login' || pathname === '/signup' || pathname === '/' || user ? children : null
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
