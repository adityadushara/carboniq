"use client"
import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Goal } from "@/types"

interface PremiumActiveGoalsProps {
  goals?: Goal[]
}

/**
 * Renders the Active Goals section, tracking user progress against set targets.
 * 
 * @component
 * @param {PremiumActiveGoalsProps} props
 */
export const PremiumActiveGoals = React.memo(function PremiumActiveGoals({ goals = [] }: PremiumActiveGoalsProps) {
  const router = useRouter()

  const displayedGoals = useMemo(() => goals.slice(0, 3), [goals])

  return (
    <Card className="border-border/50 bg-card shadow-sm xl:col-span-1">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-muted-foreground" />
          Active Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-secondary/10 rounded-xl border border-border/50 border-dashed">
            <Target className="h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground mb-4">You have no active goals.</p>
            <Button variant="outline" size="sm" onClick={() => router.push('/goals')}>
              Set a Goal
            </Button>
          </div>
        ) : (
          displayedGoals.map((goal, i) => {
            const percentage = goal.target_value > 0 ? Math.min(100, Math.round(((goal.current_value || 0) / goal.target_value) * 100)) : 0
            return (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{goal.title}</h4>
                  <span className="text-xs font-semibold bg-secondary px-2 py-0.5 rounded-md text-muted-foreground">{goal.status || 'Active'}</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{percentage}% Complete</span>
                    <span>Target: {goal.target_value} {goal.unit}</span>
                  </div>
                  <Progress value={percentage} className="h-2" aria-label={`Progress for ${goal.title}`} />
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs h-8 shadow-sm" onClick={() => router.push('/goals')} aria-label={`Update ${goal.title} goal`}>
                  Quick Update
                </Button>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
})
