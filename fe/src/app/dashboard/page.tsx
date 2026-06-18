"use client"
import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase"
import { getActivities, getGoals } from "@/lib/api"
import { PremiumHero } from "@/components/dashboard/premium-hero"
import { PremiumKPIs } from "@/components/dashboard/premium-kpis"
import dynamic from 'next/dynamic'
const PremiumEmissionsAnalytics = dynamic(() => import("@/components/dashboard/premium-emissions-analytics").then(mod => mod.PremiumEmissionsAnalytics), { ssr: false })
const PremiumEmissionBreakdown = dynamic(() => import("@/components/dashboard/premium-emission-breakdown").then(mod => mod.PremiumEmissionBreakdown), { ssr: false })
import { PremiumAIInsights } from "@/components/dashboard/premium-ai-insights"
import { PremiumActiveGoals } from "@/components/dashboard/premium-active-goals"
import { PremiumRecentActivity } from "@/components/dashboard/premium-recent-activity"
import { Loader2, AlertCircle } from "lucide-react"
import type { Activity, Goal, User } from "@/types"

/**
 * Main Dashboard Page component.
 * Fetches user data, activities, and goals, then computes memoized metrics before passing props.
 */
export default function DashboardPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setError(null)
        const supabase = createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) throw authError
        setUser(user as User)

        const [acts, gls] = await Promise.all([
          getActivities(),
          getGoals()
        ])
        
        setActivities(acts)
        setGoals(gls)
      } catch (err: any) {
        console.error("Failed to load dashboard data", err)
        setError(err.message || "Failed to load dashboard data. Please try refreshing.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Memoize heavy calculations to prevent unnecessary re-computations on re-renders
  const { score, level } = useMemo(() => {
    const totalEmissions = activities.reduce((sum, act) => sum + (act.emissions_kg || 0), 0)
    // Base 1000, -1 per kg, +5 per activity
    const calculatedScore = Math.max(0, 1000 - Math.floor(totalEmissions) + (activities.length * 5))
    
    let calculatedLevel = "Eco Beginner"
    if (calculatedScore > 1200) calculatedLevel = "Climate Champion"
    else if (calculatedScore > 1000) calculatedLevel = "Eco Warrior"
    else if (calculatedScore > 800) calculatedLevel = "Conscious Citizen"

    return { score: calculatedScore, level: calculatedLevel }
  }, [activities])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" aria-live="polite">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6" role="alert">
        <div className="bg-destructive/10 p-4 rounded-full">
          <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Oops, something went wrong</h2>
        <p className="text-muted-foreground text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Retry loading dashboard"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PremiumHero user={user} score={score} level={level} hasActivities={activities.length > 0} />
      <PremiumKPIs activities={activities} goals={goals} score={score} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PremiumEmissionsAnalytics activities={activities} />
        <PremiumEmissionBreakdown activities={activities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PremiumAIInsights activities={activities} />
        <PremiumActiveGoals goals={goals} />
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <PremiumRecentActivity activities={activities} />
        </div>
      </div>
    </div>
  )
}
