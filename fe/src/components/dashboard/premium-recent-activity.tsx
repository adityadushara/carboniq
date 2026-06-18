"use client"
import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Activity } from "@/types"

interface PremiumRecentActivityProps {
  activities?: Activity[]
}

/**
 * Renders the Recent Activity table, displaying the latest user logged events.
 * 
 * @component
 * @param {PremiumRecentActivityProps} props
 */
export const PremiumRecentActivity = React.memo(function PremiumRecentActivity({ activities = [] }: PremiumRecentActivityProps) {
  const router = useRouter()
  const displayedActivities = useMemo(() => activities.slice(0, 5), [activities])

  return (
    <Card className="border-border/50 bg-card shadow-sm xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-sm font-medium" onClick={() => router.push('/track')}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 bg-secondary/10 rounded-xl border border-border/50 border-dashed">
            <Clock className="h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground mb-4">You have no recent activities logged.</p>
            <Button variant="outline" size="sm" onClick={() => router.push('/track')}>
              Add Activity
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground border-b border-border/50">
                <tr>
                  <th className="px-2 py-3 font-medium">Activity</th>
                  <th className="px-2 py-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="px-2 py-3 font-medium text-right">Impact</th>
                  <th className="px-2 py-3 font-medium text-right hidden md:table-cell">Date</th>
                  <th className="px-2 py-3 font-medium text-right"></th>
                </tr>
              </thead>
              <tbody>
                {displayedActivities.map((item) => (
                  <tr key={item.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors group">
                    <td className="px-2 py-3 font-medium text-foreground">{item.description || item.activity_type}</td>
                    <td className="px-2 py-3 text-muted-foreground hidden sm:table-cell">
                      <span className="inline-flex bg-secondary px-2 py-0.5 rounded-md text-xs capitalize">{item.activity_type}</span>
                    </td>
                    <td className="px-2 py-3 text-right font-semibold text-destructive">+{item.emissions_kg} kg CO₂</td>
                    <td className="px-2 py-3 text-right text-muted-foreground hidden md:table-cell">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-3 text-right">
                      <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Edit activity"><Edit2 className="h-3.5 w-3.5" aria-hidden="true" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10" aria-label="Delete activity"><Trash2 className="h-3.5 w-3.5" aria-hidden="true" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
