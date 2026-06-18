"use client"
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Transport", value: 400, color: "hsl(var(--primary))" },
  { name: "Food", value: 300, color: "hsl(var(--secondary))" },
  { name: "Energy", value: 300, color: "hsl(var(--destructive))" },
]

export function CategoryPieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
