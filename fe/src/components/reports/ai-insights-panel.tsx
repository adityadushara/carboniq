"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, TrendingDown, TrendingUp, Lightbulb } from "lucide-react"

export function AiInsightsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">AI Insights</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Insight 1: Positive */}
        <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <div className="p-2 w-fit rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <TrendingDown className="h-5 w-5" />
            </div>
            <CardTitle className="text-base mt-2">Transport Emissions Dropped</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You reduced transport emissions by <strong className="text-foreground">18%</strong> this month. Your shift to public transit is making a significant impact.
            </p>
          </CardContent>
        </Card>

        {/* Insight 2: Warning/Area of Concern */}
        <Card className="glass-card border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-2">
            <div className="p-2 w-fit rounded-lg bg-orange-500/20 text-orange-600 dark:text-orange-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <CardTitle className="text-base mt-2">Food Emissions Increased</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Food-related emissions increased by <strong className="text-foreground">7%</strong>. We noticed a higher frequency of red meat consumption logged last week.
            </p>
          </CardContent>
        </Card>

        {/* Insight 3: Recommendation */}
        <Card className="glass-card border-blue-500/20 bg-blue-500/5">
          <CardHeader className="pb-2">
            <div className="p-2 w-fit rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400">
              <Lightbulb className="h-5 w-5" />
            </div>
            <CardTitle className="text-base mt-2">Actionable Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Switching to a plant-based diet just two days a week could reduce your monthly emissions by <strong className="text-foreground">40kg CO₂</strong>.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
