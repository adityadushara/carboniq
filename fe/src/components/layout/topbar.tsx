"use client"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { useEffect, useState } from "react"

export function Topbar() {
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    setIsDemo(document.cookie.includes("carboniq_demo=true"))
  }, [])

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="md:hidden font-bold text-xl text-primary flex items-center gap-2">
           CarbonIQ
        </div>
        
        {isDemo && (
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/20 text-amber-600 border border-amber-500/50 text-xs font-bold px-2 py-1 rounded">
              DEMO MODE
            </span>
            <span className="text-sm text-muted-foreground hidden lg:inline">
              You are exploring CarbonIQ using sample data.
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-4">
        {isDemo ? (
          <form action="/api/demo/exit" method="POST" className="m-0 p-0">
            <button 
              type="submit" 
              className="text-sm font-medium px-4 py-2 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
            >
              Exit Demo
            </button>
          </form>
        ) : (
          <div className="md:hidden flex items-center gap-2">
            <SignOutButton variant="ghost" size="icon" showText={false} />
          </div>
        )}
      </div>
    </header>
  )
}
