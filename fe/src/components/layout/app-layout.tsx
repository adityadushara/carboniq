"use client"
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { Topbar } from '@/components/layout/topbar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-secondary/20 p-6 md:p-8">
          <div className="mx-auto w-full max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
