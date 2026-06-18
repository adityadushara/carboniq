"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Upload, Leaf } from "lucide-react"

export function EmptyState({ onAddActivity }: { onAddActivity: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <Leaf className="h-16 w-16 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Start Your Sustainability Journey</h2>
      <p className="text-muted-foreground max-w-md text-center mb-8">
        You haven't logged any activities yet. Track your first emission to unlock AI insights, forecasting, and your carbon score.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onAddActivity} size="lg" className="gap-2">
          <PlusCircle className="h-5 w-5" /> Log First Activity
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <Upload className="h-5 w-5" /> Import Data
        </Button>
      </div>
    </div>
  )
}
