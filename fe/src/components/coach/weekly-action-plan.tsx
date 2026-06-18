"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle2, Loader2, Sparkles } from "lucide-react"

export function WeeklyActionPlan() {
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlan() {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/coach/weekly-plan`, {
        headers: { Authorization: `Bearer ${session.access_token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setPlan(data.plan)
      }
      setLoading(false)
    }
    fetchPlan()
  }, [])

  return (
    <Card className="col-span-1 shadow-lg bg-background border-primary/20 hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Weekly Action Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : plan ? (
          <div className="space-y-3 mt-4 text-sm text-muted-foreground">
            {plan.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*')).map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>{item.replace(/^[-*]\s*/, '')}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center mt-4">Failed to load plan.</p>
        )}
      </CardContent>
    </Card>
  )
}
