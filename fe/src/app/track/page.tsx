"use client"
import { useEffect, useState } from "react"
import { getActivities } from "@/lib/api"
import type { Activity } from "@/types"
import { Loader2, AlertCircle } from "lucide-react"

import { HeroKPIs } from "@/components/tracking/hero-kpis"
import { ActivityTable } from "@/components/tracking/activity-table"
import { AddActivityModal } from "@/components/tracking/add-activity-modal"
import { EmptyState } from "@/components/tracking/empty-state"

export default function TrackPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const loadActivities = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getActivities()
      setActivities(data)
    } catch (err: unknown) {
      console.error("Failed to load activities", err)
      setError((err as Error).message || "Failed to load activities")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadActivities()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading your activities...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <div className="bg-destructive/10 p-4 rounded-full">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h2 className="text-xl font-bold">Oops, something went wrong</h2>
        <p className="text-muted-foreground text-center max-w-md">{error}</p>
        <button 
          onClick={loadActivities} 
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Try Again
        </button>
      </div>
    )
  }

  const hasActivities = activities.length > 0

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <HeroKPIs activities={activities} onAddActivity={() => setIsAddModalOpen(true)} />

      {!hasActivities ? (
        <EmptyState onAddActivity={() => setIsAddModalOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-6 pt-4">
          <ActivityTable activities={activities} onDeleteActivity={loadActivities} />
        </div>
      )}

      <AddActivityModal 
        open={isAddModalOpen} 
        onOpenChange={(open) => {
          setIsAddModalOpen(open)
          if (!open) loadActivities()
        }} 
      />
    </div>
  )
}
