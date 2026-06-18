"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Target } from "lucide-react"

const forecastData = [
  { month: 'Jul', actual: 320, forecast: 320, target: 280 },
  { month: 'Aug', actual: null, forecast: 310, target: 275 },
  { month: 'Sep', actual: null, forecast: 295, target: 270 },
  { month: 'Oct', actual: null, forecast: 285, target: 265 },
  { month: 'Nov', actual: null, forecast: 280, target: 260 },
  { month: 'Dec', actual: null, forecast: 270, target: 250 },
]

export function Forecasting() {
  return (
    <Card className="glass-card shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Forecast & Goals
        </CardTitle>
        <CardDescription>AI-predicted emissions for the next 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line type="monotone" dataKey="forecast" name="AI Forecast" stroke="hsl(var(--primary))" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="target" name="Goal Target" stroke="hsl(var(--emerald-500))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="actual" name="Actual" stroke="hsl(var(--foreground))" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4 p-3 bg-secondary/30 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Year-End Target:</span>
          </div>
          <div className="font-bold">250kg / month</div>
        </div>
      </CardContent>
    </Card>
  )
}
