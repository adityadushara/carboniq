"use client"
import { useState, useMemo } from "react"
import { PremiumHero } from "@/components/dashboard/premium-hero"
import { PremiumKPIs } from "@/components/dashboard/premium-kpis"
import dynamic from 'next/dynamic'
const PremiumEmissionsAnalytics = dynamic(() => import("@/components/dashboard/premium-emissions-analytics").then(mod => mod.PremiumEmissionsAnalytics), { ssr: false })
const PremiumEmissionBreakdown = dynamic(() => import("@/components/dashboard/premium-emission-breakdown").then(mod => mod.PremiumEmissionBreakdown), { ssr: false })
import { PremiumAIInsights } from "@/components/dashboard/premium-ai-insights"
import { PremiumActiveGoals } from "@/components/dashboard/premium-active-goals"
import { PremiumRecentActivity } from "@/components/dashboard/premium-recent-activity"
import { ForecastChart } from "@/components/dashboard/forecast-chart"
import { WeeklyActionPlan } from "@/components/coach/weekly-action-plan"
import type { Activity, Goal, User } from "@/types"

// --- Mock Data ---
const MOCK_USER: User = {
  id: "demo-user-id",
  email: "demo@carboniq.app",
  user_metadata: {
    full_name: "Alex Greenfield"
  }
}

const MOCK_ACTIVITIES: Activity[] = [
  { id: "1", user_id: "demo", activity_type: "Transport", description: "Drove to work (Gasoline)", emissions_kg: 5.2, date: new Date().toISOString() },
  { id: "2", user_id: "demo", activity_type: "Diet", description: "Vegetarian lunch", emissions_kg: 1.5, date: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", user_id: "demo", activity_type: "Energy", description: "Home electricity usage", emissions_kg: 8.4, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "4", user_id: "demo", activity_type: "Transport", description: "Cycled to the park", emissions_kg: 0, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: "5", user_id: "demo", activity_type: "Shopping", description: "Bought new clothes", emissions_kg: 12.0, date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: "6", user_id: "demo", activity_type: "Diet", description: "Beef dinner", emissions_kg: 7.2, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "7", user_id: "demo", activity_type: "Energy", description: "Natural gas heating", emissions_kg: 4.1, date: new Date(Date.now() - 86400000 * 6).toISOString() },
]

const MOCK_GOALS: Goal[] = [
  {
    id: "g1", user_id: "demo", title: "Meatless Mondays", description: "Eat vegetarian meals every Monday.",
    target_value: 4, current_value: 2, unit: "days", status: "In Progress", created_at: new Date().toISOString()
  },
  {
    id: "g2", user_id: "demo", title: "Commute by Bike", description: "Cycle to work twice a week.",
    target_value: 8, current_value: 6, unit: "trips", status: "In Progress", created_at: new Date().toISOString()
  },
  {
    id: "g3", user_id: "demo", title: "Switch to LEDs", description: "Replace all home bulbs with LEDs.",
    target_value: 10, current_value: 10, unit: "bulbs", status: "Completed", created_at: new Date(Date.now() - 86400000 * 30).toISOString()
  }
]

export default function DemoDashboardPage() {
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES)
  const [goals] = useState<Goal[]>(MOCK_GOALS)
  const [user] = useState<User>(MOCK_USER)

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

  return (
    <div className="space-y-8 pb-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Demo Banner */}
      <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-primary">Demo Mode</h2>
          <p className="text-sm text-muted-foreground">You are viewing a static demonstration of the CarbonIQ dashboard.</p>
        </div>
      </div>

      <PremiumHero user={user} score={score} level={level} hasActivities={activities.length > 0} />
      <PremiumKPIs activities={activities} goals={goals} score={score} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PremiumEmissionsAnalytics activities={activities} />
        <PremiumEmissionBreakdown activities={activities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PremiumAIInsights activities={activities} />
        <ForecastChart />
        <WeeklyActionPlan />
        <PremiumActiveGoals goals={goals} />
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <PremiumRecentActivity activities={activities} />
        </div>
      </div>
    </div>
  )
}
