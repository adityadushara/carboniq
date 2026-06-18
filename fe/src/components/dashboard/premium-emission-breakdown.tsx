"use client"
import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { ArrowDown, ArrowUp } from "lucide-react"
import type { Activity } from "@/types"

interface PremiumEmissionBreakdownProps {
  activities?: Activity[]
}

/**
 * Renders a pie chart breaking down the user's emissions by category.
 * Calculates percentages and sorts by largest contributor.
 * 
 * @component
 * @param {PremiumEmissionBreakdownProps} props
 */
export const PremiumEmissionBreakdown = React.memo(function PremiumEmissionBreakdown({ activities = [] }: PremiumEmissionBreakdownProps) {
  const { totalEmissions, breakdownData } = useMemo(() => {
    const total = activities.reduce((sum, act) => sum + (act.emissions_kg || 0), 0)

    // Aggregate by type
    const typeMap: Record<string, number> = {}
    activities.forEach(act => {
      const type = act.activity_type || 'Other'
      typeMap[type] = (typeMap[type] || 0) + (act.emissions_kg || 0)
    })

    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--orange-500))',
      'hsl(var(--blue-500))',
      'hsl(var(--purple-500))',
      'hsl(var(--emerald-500))',
    ]

    const data = Object.keys(typeMap).map((type, index) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: total > 0 ? Math.round((typeMap[type] / total) * 100) : 0,
      rawVal: typeMap[type],
      color: colors[index % colors.length],
      trend: '-',
      isPositive: true
    })).sort((a, b) => b.value - a.value).slice(0, 5)

    if (data.length === 0) {
      data.push({ name: 'No Data', value: 100, rawVal: 0, color: 'hsl(var(--muted))', trend: '-', isPositive: true })
    }

    return { totalEmissions: total, breakdownData: data }
  }, [activities])

  return (
    <Card className="border-border/50 bg-card shadow-sm xl:col-span-1 flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold">Emission Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-6 flex-1">
        <div className="h-[220px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderRadius: '8px', 
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 500 }}
                formatter={(value: any) => [`${value}%`, 'Emissions']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-bold">{Math.floor(totalEmissions)}kg</span>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          {breakdownData.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-secondary/10 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-sm text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">{item.value}%</span>
                <span className={`flex items-center text-xs font-medium w-14 justify-end ${item.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {item.isPositive ? <ArrowDown className="h-3 w-3 mr-0.5" /> : <ArrowUp className="h-3 w-3 mr-0.5" />}
                  {item.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
})
