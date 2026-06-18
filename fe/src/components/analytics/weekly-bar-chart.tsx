"use client"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { week: "Week 1", transport: 120, food: 80, energy: 90 },
  { week: "Week 2", transport: 100, food: 75, energy: 85 },
  { week: "Week 3", transport: 140, food: 90, energy: 95 },
  { week: "Week 4", transport: 90, food: 70, energy: 80 },
]

export function WeeklyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="week" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
        <Tooltip 
          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
        />
        <Bar dataKey="transport" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} />
        <Bar dataKey="food" stackId="a" fill="hsl(var(--secondary))" />
        <Bar dataKey="energy" stackId="a" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
