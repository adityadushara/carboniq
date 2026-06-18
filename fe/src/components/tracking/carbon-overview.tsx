"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

const data = [
  { name: 'Mon', emissions: 12 },
  { name: 'Tue', emissions: 19 },
  { name: 'Wed', emissions: 15 },
  { name: 'Thu', emissions: 22 },
  { name: 'Fri', emissions: 18 },
  { name: 'Sat', emissions: 28 },
  { name: 'Sun', emissions: 24 },
]

const monthlyData = [
  { name: 'Jan', emissions: 400 },
  { name: 'Feb', emissions: 300 },
  { name: 'Mar', emissions: 550 },
  { name: 'Apr', emissions: 450 },
  { name: 'May', emissions: 480 },
  { name: 'Jun', emissions: 320 },
]

export function CarbonOverview() {
  return (
    <Card className="glass-card col-span-full lg:col-span-2 shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Carbon Overview</CardTitle>
          <CardDescription>Track your emission trends over time.</CardDescription>
        </div>
        <Tabs defaultValue="week" className="w-[200px] mt-4 sm:mt-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week">Weekly</TabsTrigger>
            <TabsTrigger value="month">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Area type="monotone" dataKey="emissions" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorEmissions)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
