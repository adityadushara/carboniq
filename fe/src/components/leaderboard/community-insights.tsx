"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Globe2, Leaf, Target, ArrowRight } from "lucide-react"

const challenges = [
  { id: 1, title: "Zero Waste Week", participants: "1,240", timeLeft: "3 days left", active: true },
  { id: 2, title: "Public Transit Challenge", participants: "850", timeLeft: "Starts tomorrow", active: false },
]

export function CommunityInsights() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Community Stats */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" />
            Global Impact
          </CardTitle>
          <CardDescription>What the CarbonIQ community has achieved together.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col justify-center items-center text-center">
              <Leaf className="h-5 w-5 text-emerald-500 mb-2" />
              <span className="text-2xl font-bold">12.4M</span>
              <span className="text-xs text-muted-foreground uppercase mt-1">Kg CO₂ Saved</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col justify-center items-center text-center">
              <Users className="h-5 w-5 text-blue-500 mb-2" />
              <span className="text-2xl font-bold">45,200</span>
              <span className="text-xs text-muted-foreground uppercase mt-1">Active Users</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col justify-center items-center text-center">
              <Target className="h-5 w-5 text-orange-500 mb-2" />
              <span className="text-2xl font-bold">185k</span>
              <span className="text-xs text-muted-foreground uppercase mt-1">Goals Met</span>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-500 mb-1">82</span>
              <span className="text-xs text-muted-foreground uppercase mt-1">Avg Score</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenges */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
          <CardDescription>Join community events to earn massive points.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map(c => (
            <div key={c.id} className="p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="font-bold">{c.title}</h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.participants}</span>
                  <span>•</span>
                  <span className={c.active ? "text-orange-500 font-medium" : ""}>{c.timeLeft}</span>
                </div>
              </div>
              <Button variant={c.active ? "default" : "outline"} className="w-full sm:w-auto shrink-0">
                {c.active ? "Join Now" : "Remind Me"}
              </Button>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-primary gap-2">
            View All Challenges <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
    </div>
  )
}
