"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Coffee, Zap, ShoppingBag } from "lucide-react"

const timelineData = [
  { date: 'Today', items: [
    { id: 1, time: '8:30 AM', title: 'Morning Commute', carbon: '3.2 kg', icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 2, time: '1:15 PM', title: 'Lunch', carbon: '4.5 kg', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ]},
  { date: 'Yesterday', items: [
    { id: 3, time: 'All Day', title: 'Home Electricity', carbon: '5.1 kg', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ]},
  { date: 'June 15, 2026', items: [
    { id: 4, time: '4:00 PM', title: 'Shopping', carbon: '12.0 kg', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ]},
]

export function TimelineView() {
  return (
    <Card className="glass-card shadow-lg shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-xl">Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineData.map((day, i) => (
            <div key={i}>
              <div className="text-sm font-semibold text-muted-foreground mb-4 sticky top-0 bg-card py-1 z-10">
                {day.date}
              </div>
              <div className="relative border-l border-border ml-3 space-y-6 pb-2">
                {day.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="relative pl-6">
                      <div className={`absolute -left-[17px] top-1 p-1.5 rounded-full ${item.bg} ${item.color} ring-4 ring-card`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="bg-secondary/30 rounded-lg p-3 border border-border/50 hover:bg-secondary/50 transition-colors cursor-default">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-sm">{item.title}</h4>
                            <span className="text-xs text-muted-foreground">{item.time}</span>
                          </div>
                          <div className="text-sm font-bold text-destructive">
                            +{item.carbon}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
