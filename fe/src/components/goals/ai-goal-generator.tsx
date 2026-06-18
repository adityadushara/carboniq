"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Car, Utensils, Lightbulb } from "lucide-react"

const aiGoals = [
  {
    title: "Reduce Commute Emissions",
    description: "Switching to public transport twice weekly could reduce emissions by 40kg CO₂ per month based on your logged history.",
    target: "40 kg",
    icon: Car,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Plant-based Dinners",
    description: "Replace beef with plant-based alternatives for 3 dinners a week. You log beef frequently; this is an easy win.",
    target: "12 meals",
    icon: Utensils,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Energy Efficiency",
    description: "Your energy emissions spiked last month. Try reducing AC usage by 2 hours daily.",
    target: "60 hours",
    icon: Lightbulb,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  }
]

export function AiGoalGenerator() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">AI Recommended Goals</h2>
      </div>
      <p className="text-sm text-muted-foreground max-w-3xl">
        Based on your recent activity, the CarbonIQ Gemini AI Coach has identified these high-impact goals specifically tailored to your habits.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {aiGoals.map((goal, i) => (
          <Card key={i} className="glass-card relative overflow-hidden border-primary/20 hover:border-primary/40 transition-colors flex flex-col">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Sparkles className="h-24 w-24" />
            </div>
            <CardHeader className="relative z-10 pb-2">
              <div className={`p-2.5 rounded-lg w-fit mb-3 ${goal.bg} ${goal.color}`}>
                <goal.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{goal.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 flex-1">
              <CardDescription className="text-sm leading-relaxed">
                {goal.description}
              </CardDescription>
              <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">
                <Target className="h-3 w-3" /> Target: {goal.target}
              </div>
            </CardContent>
            <CardFooter className="relative z-10 pt-4 border-t border-border/50 bg-background/50 gap-2">
              <Button className="flex-1 text-xs h-9">Accept Goal</Button>
              <Button variant="outline" className="flex-1 text-xs h-9">Customize</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Target(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
}
