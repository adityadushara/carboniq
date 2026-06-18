"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, LayoutDashboard, PlusCircle, Target, FileText, Settings, Trophy, Users } from 'lucide-react'
import { AICoachSheet } from "@/components/coach/ai-coach-sheet"
import { SignOutButton } from "@/components/auth/sign-out-button"

const routes = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/track', label: 'Track Emissions', icon: PlusCircle },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/reports', label: 'Reports', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-card border-r">
      <div className="p-6 flex items-center gap-2 text-primary">
        <Leaf className="h-8 w-8" />
        <span className="text-2xl font-bold tracking-tight">CarbonIQ</span>
      </div>
      <div className="flex-1 px-4 space-y-2 mt-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
              pathname === route.href
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-4 mt-auto border-t flex flex-col gap-2">
        <AICoachSheet />
        <SignOutButton variant="ghost" className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-500/10" />
      </div>
    </div>
  )
}
