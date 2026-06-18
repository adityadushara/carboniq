"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const hotspots = [
  { id: 1, name: 'Daily Commute (Car)', category: 'Transport', value: 120, total: 320, color: 'bg-blue-500' },
  { id: 2, name: 'Air Travel', category: 'Transport', value: 85, total: 320, color: 'bg-orange-500' },
  { id: 3, name: 'Beef Consumption', category: 'Food', value: 45, total: 320, color: 'bg-red-500' },
  { id: 4, name: 'Home Heating', category: 'Energy', value: 30, total: 320, color: 'bg-yellow-500' },
]

export function CarbonHotspots() {
  return (
    <Card className="glass-card shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Carbon Hotspots
        </CardTitle>
        <CardDescription>Your largest emission sources this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mt-2">
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium flex items-center gap-2">
                  {hotspot.name}
                  {hotspot.value > 100 && <AlertTriangle className="h-3 w-3 text-destructive" />}
                </div>
                <div className="text-muted-foreground">
                  <span className="font-bold text-foreground">{hotspot.value}kg</span> ({Math.round((hotspot.value / hotspot.total) * 100)}%)
                </div>
              </div>
              <Progress value={(hotspot.value / 150) * 100} className="h-2" indicatorColor={hotspot.color} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
