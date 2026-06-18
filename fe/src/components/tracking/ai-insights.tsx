"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, TrendingDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AIInsights() {
  return (
    <Card className="glass-card shadow-lg shadow-primary/5 bg-gradient-to-br from-card to-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          <div className="p-4 rounded-xl bg-background/60 border border-primary/10 shadow-sm">
            <h4 className="font-semibold text-sm mb-1 text-foreground">Transportation Trend</h4>
            <p className="text-sm text-muted-foreground">Your transportation emissions increased by <span className="text-destructive font-medium">12%</span> this week. Consider carpooling or public transit.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-background/60 border border-primary/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <h4 className="font-semibold text-sm mb-1 text-foreground">Actionable Saving</h4>
            <p className="text-sm text-muted-foreground">Switching to public transport twice weekly could save <span className="text-emerald-500 font-bold">40kg CO₂</span> monthly.</p>
            <Button variant="link" className="px-0 mt-1 h-auto text-emerald-500 font-medium">Set as Goal <ArrowRight className="h-3 w-3 ml-1" /></Button>
          </div>
          
          <div className="p-4 rounded-xl bg-background/60 border border-primary/10 shadow-sm">
            <h4 className="font-semibold text-sm mb-1 text-foreground">Diet Impact</h4>
            <p className="text-sm text-muted-foreground">Food-related emissions contribute <span className="text-orange-500 font-medium">35%</span> of your footprint. Try one plant-based meal a day.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
