"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, GitCompare } from "lucide-react"

export function ReportComparison() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <GitCompare className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">Period Comparison</h2>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Month over Month</CardTitle>
              <CardDescription>June 2026 vs May 2026</CardDescription>
            </div>
            <select className="bg-background/50 border border-input rounded-md px-3 py-1.5 text-sm">
              <option>Month vs Month</option>
              <option>Year vs Year</option>
              <option>Custom Range</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Metric 1 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Emissions</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">320 kg</span>
                <span className="text-sm text-muted-foreground line-through">350 kg</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                <ArrowDownRight className="h-4 w-4" />
                8.5% improvement
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Carbon Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">84</span>
                <span className="text-sm text-muted-foreground line-through">79</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4" />
                +5 points
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Transport Emissions</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">140 kg</span>
                <span className="text-sm text-muted-foreground line-through">115 kg</span>
              </div>
              <div className="flex items-center gap-1 text-orange-500 text-sm font-medium">
                <ArrowUpRight className="h-4 w-4" />
                21.7% increase
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
