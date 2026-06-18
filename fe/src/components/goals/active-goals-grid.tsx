"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar, Target, CheckCircle2, Edit2, Trash2, Bus, Zap, ShoppingBag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const activeGoals = [
  { 
    id: 1, title: "Reduce Commute Emissions", category: "Transportation", 
    target: "150 kg", current: "90 kg", percentage: 60, 
    remaining: "60 kg to go", dueDate: "June 30, 2026", priority: "High", icon: Bus, color: "text-blue-500", bg: "bg-blue-500/10" 
  },
  { 
    id: 2, title: "Cut Energy Usage", category: "Energy", 
    target: "200 kWh", current: "180 kWh", percentage: 90, 
    remaining: "20 kWh to go", dueDate: "July 15, 2026", priority: "Medium", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" 
  },
  { 
    id: 3, title: "Sustainable Shopping", category: "Shopping", 
    target: "5 items", current: "1 item", percentage: 20, 
    remaining: "4 items to go", dueDate: "August 1, 2026", priority: "Low", icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-500/10" 
  },
]

export function ActiveGoalsGrid() {
  const [selectedGoal, setSelectedGoal] = useState<any>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Active Goals</h2>
          <p className="text-sm text-muted-foreground">Track and manage your current sustainability targets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeGoals.map((goal) => {
          const Icon = goal.icon
          return (
            <Card 
              key={goal.id} 
              className="glass-card hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedGoal(goal)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={`p-2.5 rounded-xl ${goal.bg} ${goal.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} render={<Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />}>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2" onClick={(e) => e.stopPropagation()}>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Mark Complete
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2" onClick={(e) => e.stopPropagation()}>
                        <Edit2 className="h-4 w-4" /> Edit Goal
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive" onClick={(e) => e.stopPropagation()}>
                        <Trash2 className="h-4 w-4" /> Delete Goal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg mt-4">{goal.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{goal.category}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    goal.priority === 'High' ? 'bg-destructive/10 text-destructive' : 
                    goal.priority === 'Medium' ? 'bg-orange-500/10 text-orange-600' : 'bg-blue-500/10 text-blue-600'
                  }`}>
                    {goal.priority} Priority
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">{goal.current}</span>
                    <span className="text-muted-foreground">of {goal.target}</span>
                  </div>
                  <Progress value={goal.percentage} className={`h-2.5 ${goal.percentage >= 80 ? '[&>div]:bg-emerald-500' : ''}`} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{goal.percentage}% Complete</span>
                    <span>{goal.remaining}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background/50 px-2.5 py-1.5 rounded-md border w-full">
                  <Calendar className="h-3.5 w-3.5" />
                  Due: <span className="font-medium text-foreground">{goal.dueDate}</span>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Goal Details Slide-over */}
      <Sheet open={!!selectedGoal} onOpenChange={(open) => !open && setSelectedGoal(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedGoal && (
            <>
              <SheetHeader className="text-left space-y-4">
                <div className={`p-4 rounded-2xl w-fit ${selectedGoal.bg} ${selectedGoal.color}`}>
                  <selectedGoal.icon className="h-8 w-8" />
                </div>
                <div>
                  <SheetTitle className="text-2xl">{selectedGoal.title}</SheetTitle>
                  <SheetDescription className="text-base mt-1">
                    {selectedGoal.category} • Due {selectedGoal.dueDate}
                  </SheetDescription>
                </div>
              </SheetHeader>
              
              <div className="mt-8 space-y-8">
                {/* Progress Overview */}
                <div className="space-y-3 p-5 rounded-xl border bg-card shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Progress Overview</h3>
                    <span className="text-2xl font-bold">{selectedGoal.percentage}%</span>
                  </div>
                  <Progress value={selectedGoal.percentage} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground pt-1">
                    <span>Current: <strong className="text-foreground">{selectedGoal.current}</strong></span>
                    <span>Target: <strong className="text-foreground">{selectedGoal.target}</strong></span>
                  </div>
                </div>

                {/* Activity History Mock */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Recent Progress</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-sm">Logged Activity</h4>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Added +15 to progress tracking.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex gap-2">
                  <Button className="flex-1 gap-2"><CheckCircle2 className="h-4 w-4" /> Update Progress</Button>
                  <Button variant="outline" className="flex-1">Edit Details</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
