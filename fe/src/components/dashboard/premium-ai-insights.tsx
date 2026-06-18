"use client"
import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Activity } from "@/types"

interface PremiumAIInsightsProps {
  activities?: Activity[]
}

/**
 * Renders the AI Insights section, offering dynamic suggestions based on user activities.
 * 
 * @component
 * @param {PremiumAIInsightsProps} props
 */
export const PremiumAIInsights = React.memo(function PremiumAIInsights({ activities = [] }: PremiumAIInsightsProps) {
  const router = useRouter()
  
  const insights = useMemo(() => {
    const hasActivities = activities.length > 0
    const totalEmissions = activities.reduce((sum, act) => sum + (act.emissions_kg || 0), 0)

    if (hasActivities) {
      return [
        {
          desc: `You have logged ${activities.length} activities resulting in ${Math.floor(totalEmissions)}kg of CO₂.`,
          impact: "Overview",
          action: "View Breakdown",
          link: "/reports",
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20"
        },
        {
          desc: "Switching to public transport twice weekly could significantly reduce your emissions.",
          impact: "Suggestion",
          action: "Set Goal",
          link: "/goals",
          color: "text-emerald-500",
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/20"
        }
      ]
    }

    return [
      {
        desc: "Start logging your daily commute and meals to receive personalized AI insights and reduction strategies.",
        impact: "Action Required",
        action: "Log Activity",
        link: "/track",
        color: "text-primary",
        bg: "bg-primary/10",
        border: "border-primary/20"
      }
    ]
  }, [activities])

  return (
    <Card className="border-border/50 bg-card shadow-sm xl:col-span-1 flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        {insights.map((insight, i) => (
          <div key={i} className={`p-4 rounded-xl border ${insight.border} bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group flex flex-col justify-between`}>
            <p className="text-sm text-foreground leading-relaxed mb-4">{insight.desc}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${insight.bg} ${insight.color}`}>
                {insight.impact}
              </span>
              <button 
                className={`text-xs font-semibold flex items-center gap-1 ${insight.color} group-hover:underline underline-offset-4`}
                onClick={() => router.push(insight.link)}
              >
                {insight.action} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
})
