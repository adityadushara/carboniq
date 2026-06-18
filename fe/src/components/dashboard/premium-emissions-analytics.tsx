"use client"
import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Activity } from "@/types"

interface PremiumEmissionsAnalyticsProps {
  activities?: Activity[]
}

/**
 * Renders an area chart of the user's daily emissions over the past 7 days.
 * Memoizes chart data processing to optimize renders.
 * 
 * @component
 * @param {PremiumEmissionsAnalyticsProps} props
 */
export const PremiumEmissionsAnalytics = React.memo(function PremiumEmissionsAnalytics({ activities = [] }: PremiumEmissionsAnalyticsProps) {
  // Process activities into daily emissions for the last 7 days
  const analyticsData = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' })
      
      const dayEmissions = activities
        .filter(act => new Date(act.date).toDateString() === d.toDateString())
        .reduce((sum, act) => sum + (act.emissions_kg || 0), 0)
        
      return { date: dateStr, emissions: dayEmissions }
    })
  }, [activities])

  return (
    <Card className="border-border/50 bg-card shadow-sm xl:col-span-2">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-semibold">Emissions Analytics</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Your carbon footprint over time.</p>
        </div>
        <Tabs defaultValue="weekly" className="mt-4 sm:mt-0">
          <TabsList className="h-9">
            <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `${val}kg`}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  borderRadius: '8px', 
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))', fontSize: '12px', marginBottom: '4px' }}
                cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="emissions" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#premiumGradient)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
})
