"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Plus, FileText, ArrowDownRight } from "lucide-react"
import { useRouter } from "next/navigation"

import type { User } from "@/types"

interface PremiumHeroProps {
  user?: User | null
  score: number
  level: string
  hasActivities: boolean
}

/**
 * Renders the Premium Hero section, displaying user welcome message and high-level score.
 * 
 * @component
 * @param {PremiumHeroProps} props - The component props.
 */
export const PremiumHero = React.memo(function PremiumHero({ user, score, level, hasActivities }: PremiumHeroProps) {
  const router = useRouter()
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Eco Warrior'

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 py-8 border-b border-border/50" role="banner">
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Welcome back, {firstName}</h1>
        <div className="flex items-center gap-2">
          {hasActivities ? (
            <div className="flex items-center text-sm font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 px-2.5 py-1 rounded-md">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              Your carbon footprint is being tracked. Keep it up!
            </div>
          ) : (
            <div className="flex items-center text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-500 px-2.5 py-1 rounded-md">
              <Plus className="h-4 w-4 mr-1" />
              Start logging your first activity today.
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-medium">Score: {score}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="font-medium">Level: {level}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <Button variant="outline" className="w-full lg:w-auto shadow-sm" onClick={() => router.push('/reports')} aria-label="Generate carbon report">
          <FileText className="h-4 w-4 mr-2" aria-hidden="true" /> Generate Report
        </Button>
        <Button className="w-full lg:w-auto shadow-sm" onClick={() => router.push('/track')} aria-label="Add new activity">
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" /> Add Activity
        </Button>
      </div>
    </div>
  )
})
