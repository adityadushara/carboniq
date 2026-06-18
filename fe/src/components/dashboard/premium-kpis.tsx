"use client"
import React, { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import type { Activity, Goal } from "@/types"

const generateSparkline = (points: number, min: number, max: number) => {
  return Array.from({ length: points }).map((_, i) => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }))
}

interface PremiumKPIsProps {
  activities?: Activity[]
  goals?: Goal[]
  score?: number
}

/**
 * Renders the top-level KPI grid on the dashboard.
 * Memoized to prevent unnecessary re-renders.
 * 
 * @component
 * @param {PremiumKPIsProps} props
 */
export const PremiumKPIs = React.memo(function PremiumKPIs({ activities = [], goals = [], score = 1000 }: PremiumKPIsProps) {
  const totalEmissions = useMemo(() => activities.reduce((sum, act) => sum + (act.emissions_kg || 0), 0), [activities])
  
  const kpis = useMemo(() => [
    {
      title: "Carbon Score",
      value: score.toString(),
      trend: activities.length ? "+5%" : "-",
      isPositive: true,
      data: activities.length ? generateSparkline(10, Math.max(0, score - 50), score) : generateSparkline(10, 1000, 1000),
      color: "hsl(var(--primary))",
    },
    {
      title: "Monthly Emissions",
      value: `${Math.floor(totalEmissions)} kg`,
      trend: activities.length ? "-12%" : "-",
      isPositive: true,
      data: activities.length ? generateSparkline(10, Math.max(0, totalEmissions - 100), totalEmissions + 50).reverse() : generateSparkline(10, 0, 0),
      color: "hsl(var(--emerald-500))",
    },
    {
      title: "Carbon Saved",
      value: "0 kg",
      trend: "-",
      isPositive: true,
      data: generateSparkline(10, 0, 0),
      color: "hsl(var(--emerald-500))",
    },
    {
      title: "Active Goals",
      value: goals.length.toString(),
      trend: goals.length ? "Steady" : "-",
      isPositive: true,
      data: goals.length ? generateSparkline(10, goals.length, goals.length + 2) : generateSparkline(10, 0, 0),
      color: "hsl(var(--blue-500))",
    },
    {
      title: "Sustainability Streak",
      value: activities.length ? "1 Day" : "0 Days",
      trend: "-",
      isPositive: true,
      data: activities.length ? generateSparkline(10, 0, 1) : generateSparkline(10, 0, 0),
      color: "hsl(var(--orange-500))",
    },
    {
      title: "Community Rank",
      value: activities.length ? "Top 15%" : "Unranked",
      trend: "-",
      isPositive: true,
      data: activities.length ? generateSparkline(10, 10, 20).reverse() : generateSparkline(10, 0, 0),
      color: "hsl(var(--purple-500))",
    },
  ], [activities.length, score, totalEmissions, goals.length])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="overflow-hidden border-border/50 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-border">
          <CardContent className="p-4 flex flex-col justify-between h-full relative group">
            <div className="space-y-1 z-10">
              <p className="text-xs font-medium text-muted-foreground">{kpi.title}</p>
              <div className="flex items-end gap-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{kpi.value}</h3>
                <span className={`text-[10px] font-medium mb-1 flex items-center ${kpi.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {kpi.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {kpi.trend}
                </span>
              </div>
            </div>
            
            <div className="h-10 w-full mt-4 z-0 opacity-50 group-hover:opacity-100 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpi.data}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={kpi.color} 
                    strokeWidth={2} 
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
})
