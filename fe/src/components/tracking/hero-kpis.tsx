"use client"
import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, Sparkles, Activity, Leaf, Flame } from "lucide-react"
import type { Activity as ActivityType } from "@/types"

export function HeroKPIs({ activities = [], onAddActivity }: { activities?: ActivityType[], onAddActivity: () => void }) {
  const { totalEmissions, score, thisMonthEmissions } = useMemo(() => {
    const total = activities.reduce((sum, act) => sum + (act.emissions_kg || 0), 0)
    const calcScore = Math.max(0, 1000 - Math.floor(total) + (activities.length * 5))
    
    const now = new Date()
    const thisMonth = activities
      .filter(act => {
        const d = new Date(act.date)
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
      .reduce((sum, act) => sum + (act.emissions_kg || 0), 0)

    return {
      totalEmissions: Math.round(total),
      score: calcScore,
      thisMonthEmissions: Math.round(thisMonth)
    }
  }, [activities])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Activity Tracker</h1>
          <p className="text-muted-foreground">Manage and view all your carbon activities.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={onAddActivity} className="gap-2 shadow-sm">
            <PlusCircle className="h-4 w-4" /> Add Activity
          </Button>
          <Button variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
            <Upload className="h-4 w-4" /> Import Data
          </Button>
          <Button variant="secondary" className="gap-2 bg-primary/10 text-primary hover:bg-primary/20">
            <Sparkles className="h-4 w-4" /> AI Analyze
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Carbon Footprint */}
        <Card className="glass-card bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Leaf className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Total Footprint</span>
            </div>
            <div className="text-3xl font-bold">{totalEmissions} <span className="text-lg text-muted-foreground font-normal">kg</span></div>
          </CardContent>
        </Card>

        {/* Carbon Score */}
        <Card className="glass-card bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Carbon Score</span>
            </div>
            <div className="text-3xl font-bold text-primary">{score}<span className="text-lg text-muted-foreground font-normal">/100</span></div>
          </CardContent>
        </Card>

        {/* Monthly Emissions */}
        <Card className="glass-card bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">This Month</span>
            </div>
            <div className="text-3xl font-bold">{thisMonthEmissions} <span className="text-lg text-muted-foreground font-normal">kg</span></div>
          </CardContent>
        </Card>

        {/* Carbon Saved */}
        <Card className="glass-card bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Total Activities</span>
            </div>
            <div className="text-3xl font-bold">{activities.length}</div>
          </CardContent>
        </Card>

        {/* Sustainability Streak */}
        <Card className="glass-card bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Active Streak</span>
            </div>
            <div className="text-3xl font-bold">14 <span className="text-lg text-muted-foreground font-normal">Days</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
