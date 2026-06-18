"use client"
import { LogOut } from "lucide-react"
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button"

interface SignOutButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  showText?: boolean;
}

export function SignOutButton({ variant = "ghost", size = "default", className = "", showText = true }: SignOutButtonProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      toast.success("Successfully signed out")
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out")
    }
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleSignOut}>
      <LogOut className={`h-4 w-4 ${showText ? 'mr-2' : ''}`} />
      {showText && "Sign Out"}
    </Button>
  )
}
