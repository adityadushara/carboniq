"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const overallProgressData = [
  { name: 'Transport', uv: 85, fill: '#3b82f6' },
  { name: 'Energy', uv: 65, fill: '#f59e0b' },
  { name: 'Food', uv: 92, fill: '#10b981' },
  { name: 'Shopping', uv: 45, fill: '#8b5cf6' },
]

const monthlyCompletionData = [
  { name: 'Jan', completed: 3, total: 4 },
  { name: 'Feb', completed: 4, total: 4 },
  { name: 'Mar', completed: 2, total: 5 },
  { name: 'Apr', completed: 5, total: 5 },
  { name: 'May', completed: 4, total: 6 },
  { name: 'Jun', completed: 2, total: 6 },
]

export function GoalsOverview() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[350px] animate-pulse bg-muted/50" />
        <Card className="h-[350px] animate-pulse bg-muted/50" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* Category Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Goal Progress by Category</CardTitle>
          <CardDescription>How you are tracking against your primary sustainability categories.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between">
          <div className="h-[250px] w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={12} 
                data={overallProgressData} startAngle={180} endAngle={-180}
              >
                <RadialBar
                  background={{ fill: 'hsl(var(--secondary))' }}
                  dataKey="uv"
                  cornerRadius={10}
                />
                <RechartsTooltip 
                  cursor={false}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  formatter={(value: any) => [`${value}%`, 'Progress']}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 space-y-4 mt-4 md:mt-0">
            {overallProgressData.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></span>
                    {item.name}
                  </span>
                  <span className="text-muted-foreground">{item.uv}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.uv}%`, backgroundColor: item.fill }}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goal Completion */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Monthly Completion Trend</CardTitle>
          <CardDescription>Number of goals successfully completed each month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyCompletionData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10}
                />
                <YAxis 
                  axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--secondary))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="completed" name="Completed Goals" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Total Targets" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
