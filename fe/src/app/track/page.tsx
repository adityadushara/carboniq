"use client"
import { useState } from "react"
import { HeroKPIs } from "@/components/tracking/hero-kpis"
import { CarbonOverview } from "@/components/tracking/carbon-overview"
import { EmissionBreakdown } from "@/components/tracking/emission-breakdown"
import { ActivityTable } from "@/components/tracking/activity-table"
import { TimelineView } from "@/components/tracking/timeline-view"
import { AddActivityModal } from "@/components/tracking/add-activity-modal"
import { AIInsights } from "@/components/tracking/ai-insights"
import { CarbonHotspots } from "@/components/tracking/carbon-hotspots"
import { Forecasting } from "@/components/tracking/forecasting"
import { MapVisualization } from "@/components/tracking/map-visualization"
import { EmptyState } from "@/components/tracking/empty-state"

export default function TrackPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [hasActivities, setHasActivities] = useState(true)

  // Toggle for testing empty state
  // const [hasActivities, setHasActivities] = useState(false)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <HeroKPIs onAddActivity={() => setIsAddModalOpen(true)} />

      {!hasActivities ? (
        <EmptyState onAddActivity={() => setIsAddModalOpen(true)} />
      ) : (
        <>
          {/* Main Dashboard Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CarbonOverview />
            <EmissionBreakdown />
          </div>

          {/* AI and Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AIInsights />
            <CarbonHotspots />
            <Forecasting />
          </div>

          <div className="grid grid-cols-1 gap-6">
             <MapVisualization />
          </div>

          {/* Activity Logs & Timeline */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
            <ActivityTable />
            <TimelineView />
          </div>
        </>
      )}

      <AddActivityModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
