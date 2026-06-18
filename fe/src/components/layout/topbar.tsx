"use client"
import { SignOutButton } from "@/components/auth/sign-out-button"

export function Topbar() {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="md:hidden font-bold text-xl text-primary flex items-center gap-2">
         CarbonIQ
      </div>
      <div className="hidden md:flex flex-1"></div>
      <div className="md:hidden flex items-center gap-2">
        <SignOutButton variant="ghost" size="icon" showText={false} />
      </div>
    </header>
  )
}
