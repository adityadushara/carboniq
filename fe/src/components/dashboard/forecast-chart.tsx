"use client"
import { useEffect, useState } from "react"
import { fetchApi } from "@/lib/api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingDown, TrendingUp } from "lucide-react"

export function ForecastChart() {
  const [data, setData] = useState<{current_total: number, projected_next_month: number, trend: string} | null>(null)

  useEffect(() => {
    async function fetchForecast() {
      try {
        const forecast = await fetchApi<{current_total: number, projected_next_month: number, trend: string}>('/forecasting')
        setData(forecast)
      } catch {
        setData(null)
      }
    }
    fetchForecast()
  }, [])

  if (!data) return null

  const chartData = [
    { name: 'Current Month', value: data.current_total },
    { name: 'Next Month (Projected)', value: data.projected_next_month }
  ]

  return (
    <Card className="col-span-1 shadow-lg bg-background border-primary/20 hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">
          Carbon Reduction Forecast
        </CardTitle>
        {data.trend === 'down' ? <TrendingDown className="h-5 w-5 text-green-500" /> : <TrendingUp className="h-5 w-5 text-red-500" />}
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              />
              <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Based on your current activity, you are projected to emit {data.projected_next_month.toFixed(1)} kg next month.
        </p>
      </CardContent>
    </Card>
  )
}
