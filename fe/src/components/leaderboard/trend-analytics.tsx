"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const rankData = [
  { week: 'W1', rank: 45 },
  { week: 'W2', rank: 32 },
  { week: 'W3', rank: 28 },
  { week: 'W4', rank: 15 },
  { week: 'W5', rank: 10 },
  { week: 'Current', rank: 7 },
]

export function TrendAnalytics() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) {
    return <Card className="h-[350px] animate-pulse bg-muted/50" />
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Your Rank Progression
        </CardTitle>
        <CardDescription>Watch your climb up the global leaderboard over the past 6 weeks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rankData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
              {/* Invert Y axis so rank 1 is at the top */}
              <YAxis reversed axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                formatter={(value: any) => [`#${value}`, 'Global Rank']}
              />
              <Line 
                type="monotone" 
                dataKey="rank" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3} 
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
