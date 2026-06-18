"use client"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function AppearanceSection() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Appearance</h2>
        <p className="text-muted-foreground">Customize the look and feel of CarbonIQ.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>Select a theme for your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            {/* Light Theme Option */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "relative flex aspect-video cursor-pointer items-center justify-center rounded-xl border-2 bg-slate-50 overflow-hidden transition-all hover:border-primary/50",
                  theme === "light" ? "border-primary" : "border-border"
                )}
              >
                {/* Visual Preview */}
                <div className="absolute inset-2 rounded-lg bg-white shadow-sm border flex flex-col p-2 gap-2">
                  <div className="h-3 w-1/3 rounded bg-slate-200"></div>
                  <div className="h-full w-full rounded bg-slate-100 border border-slate-200"></div>
                </div>
              </button>
              <div className="flex items-center gap-2 justify-center">
                <Sun className="h-4 w-4 text-amber-500" />
                <span className="font-medium text-sm">Light</span>
              </div>
            </div>

            {/* Dark Theme Option */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "relative flex aspect-video cursor-pointer items-center justify-center rounded-xl border-2 bg-slate-950 overflow-hidden transition-all hover:border-primary/50",
                  theme === "dark" ? "border-primary" : "border-border"
                )}
              >
                {/* Visual Preview */}
                <div className="absolute inset-2 rounded-lg bg-slate-900 shadow-sm border border-slate-800 flex flex-col p-2 gap-2">
                  <div className="h-3 w-1/3 rounded bg-slate-800"></div>
                  <div className="h-full w-full rounded bg-slate-950 border border-slate-800"></div>
                </div>
              </button>
              <div className="flex items-center gap-2 justify-center">
                <Moon className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-sm">Dark</span>
              </div>
            </div>

            {/* System Theme Option */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setTheme("system")}
                className={cn(
                  "relative flex aspect-video cursor-pointer items-center justify-center rounded-xl border-2 bg-gradient-to-br from-slate-50 to-slate-950 overflow-hidden transition-all hover:border-primary/50",
                  theme === "system" ? "border-primary" : "border-border"
                )}
              >
                {/* Visual Preview */}
                <div className="absolute inset-2 rounded-lg shadow-sm border overflow-hidden flex">
                  <div className="w-1/2 h-full bg-white flex flex-col p-2 gap-2">
                    <div className="h-3 w-2/3 rounded bg-slate-200"></div>
                    <div className="h-full w-full rounded bg-slate-100 border border-slate-200"></div>
                  </div>
                  <div className="w-1/2 h-full bg-slate-900 flex flex-col p-2 gap-2 border-l border-slate-800">
                    <div className="h-3 w-2/3 rounded bg-slate-800"></div>
                    <div className="h-full w-full rounded bg-slate-950 border border-slate-800"></div>
                  </div>
                </div>
              </button>
              <div className="flex items-center gap-2 justify-center">
                <Monitor className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="font-medium text-sm">System</span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
