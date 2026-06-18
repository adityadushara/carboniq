"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const breakdownData = [
  { name: 'Transportation', value: 400, color: 'hsl(var(--primary))' },
  { name: 'Food & Diet', value: 300, color: 'hsl(var(--chart-2, 25 95% 53%))' },
  { name: 'Electricity', value: 200, color: 'hsl(var(--chart-3, 43 74% 66%))' },
  { name: 'Shopping', value: 150, color: 'hsl(var(--chart-4, 27 87% 67%))' },
  { name: 'Waste', value: 50, color: 'hsl(var(--chart-5, 12 76% 61%))' },
]

export function EmissionBreakdown() {
  return (
    <Card className="glass-card shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl">Emission Breakdown</CardTitle>
        <CardDescription>Your carbon footprint by category.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value) => [`${value} kg`, 'Emissions']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry: any) => <span className="text-sm text-foreground ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
