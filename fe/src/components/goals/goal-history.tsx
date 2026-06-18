"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const history = [
  { id: 1, title: "Cycle to Work Week", category: "Transportation", completedOn: "June 10, 2026", carbonSaved: "15 kg", duration: "7 days" },
  { id: 2, title: "Vegan January", category: "Food & Diet", completedOn: "Jan 31, 2026", carbonSaved: "45 kg", duration: "31 days" },
  { id: 3, title: "LED Bulb Replacement", category: "Energy", completedOn: "Dec 15, 2025", carbonSaved: "120 kg/yr", duration: "1 day" },
  { id: 4, title: "No Fly Year", category: "Travel", completedOn: "Dec 31, 2025", carbonSaved: "350 kg", duration: "365 days" },
]

export function GoalHistory() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Completed Goals</h2>
          <p className="text-sm text-muted-foreground">Your historical wins and completed targets.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search history..." className="w-full pl-8 bg-background" />
          </div>
          <Button variant="outline" size="icon" className="shrink-0"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {history.map((goal) => (
              <div key={goal.id} className="p-4 sm:px-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{goal.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary">{goal.category}</span>
                      <span className="text-xs text-muted-foreground">Completed {goal.completedOn}</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-4 sm:gap-1 items-center sm:items-end ml-12 sm:ml-0 text-sm">
                  <div className="font-medium text-emerald-500">-{goal.carbonSaved}</div>
                  <div className="text-muted-foreground text-xs">Took {goal.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
