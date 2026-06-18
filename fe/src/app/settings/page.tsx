"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Shield, Bell, Monitor, Lock, Leaf, Link as LinkIcon, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

// Placeholder components - we'll build these next
import ProfileSection from '@/components/settings/profile-section'
import AccountSection from '@/components/settings/account-section'
import NotificationsSection from '@/components/settings/notifications-section'
import AppearanceSection from '@/components/settings/appearance-section'
import PrivacySecuritySection from '@/components/settings/privacy-security-section'
import CarbonPreferencesSection from '@/components/settings/carbon-preferences-section'
import IntegrationsSection from '@/components/settings/integrations-section'
import DataReportsSection from '@/components/settings/data-reports-section'

const SETTINGS_SECTIONS = [
  { id: 'profile', label: 'Profile', icon: User, component: ProfileSection },
  { id: 'account', label: 'Account', icon: Shield, component: AccountSection },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationsSection },
  { id: 'appearance', label: 'Appearance', icon: Monitor, component: AppearanceSection },
  { id: 'privacy', label: 'Privacy & Security', icon: Lock, component: PrivacySecuritySection },
  { id: 'carbon', label: 'Carbon Preferences', icon: Leaf, component: CarbonPreferencesSection },
  { id: 'integrations', label: 'Integrations', icon: LinkIcon, component: IntegrationsSection },
  { id: 'data', label: 'Data & Reports', icon: Download, component: DataReportsSection },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState(SETTINGS_SECTIONS[0].id)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const ActiveComponent = SETTINGS_SECTIONS.find(s => s.id === activeSection)?.component || ProfileSection

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 py-6">
      
      {/* Mobile Header & Navigation */}
      <div className="md:hidden flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>
        
        {/* Horizontal scrollable nav for mobile */}
        <div className="relative w-full overflow-hidden">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 mask-linear-fade">
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground mt-2">Manage your account and preferences.</p>
          </div>
          
          <nav className="flex flex-col gap-1">
            {SETTINGS_SECTIONS.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-sm translate-x-1" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:translate-x-1"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full w-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  )
}
