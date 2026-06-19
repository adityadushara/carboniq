"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend
} from "recharts"

const monthlyData = [
  { name: 'Jan', actual: 400, forecast: null },
  { name: 'Feb', actual: 380, forecast: null },
  { name: 'Mar', actual: 420, forecast: null },
  { name: 'Apr', actual: 390, forecast: null },
  { name: 'May', actual: 350, forecast: null },
  { name: 'Jun', actual: 320, forecast: 320 },
  { name: 'Jul', actual: null, forecast: 300 },
  { name: 'Aug', actual: null, forecast: 290 },
  { name: 'Sep', actual: null, forecast: 275 },
]

const goalData = [
  { name: 'Transport Goal', uv: 85, fill: '#10b981' },
  { name: 'Energy Goal', uv: 65, fill: '#3b82f6' },
  { name: 'Food Goal', uv: 92, fill: '#f59e0b' },
]

export function ReportsDashboard() {
  const [isMounted, setIsMounted] = useState(false)

  // Recharts requires a mounted check to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[400px] animate-pulse bg-muted/50" />
        <Card className="h-[400px] animate-pulse bg-muted/50" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Monthly Emissions Trend */}
      <Card className="glass-card lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Carbon Reduction Trend</CardTitle>
              <CardDescription>Monthly emissions vs projected forecast (kg CO₂)</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary" />
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-sm bg-primary/30 border border-primary/50 border-dashed" />
                <span className="text-muted-foreground">Forecast</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorForecast)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Goal Achievement Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Goal Achievement</CardTitle>
          <CardDescription>Progress towards monthly targets</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="40%" 
                outerRadius="80%" 
                barSize={15} 
                data={goalData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background={{ fill: 'hsl(var(--secondary))' }}
                  dataKey="uv"
                  cornerRadius={10}
                />
                <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '10px' }} />
                <RechartsTooltip 
                  cursor={false}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: any) => [`${value}%`, 'Progress']}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2 space-y-1">
            <p className="text-3xl font-bold tracking-tight">81%</p>
            <p className="text-sm text-muted-foreground">Overall Goal Completion</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
