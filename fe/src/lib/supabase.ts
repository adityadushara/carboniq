import { createBrowserClient } from '@supabase/ssr'
import { DEMO_USER } from './mock-data'

export const createClient = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Intercept auth calls if we are in demo mode
  if (typeof document !== 'undefined' && document.cookie.includes('carboniq_demo=true')) {
    supabase.auth.getUser = async () => ({ data: { user: DEMO_USER as any }, error: null })
    supabase.auth.getSession = async () => ({ 
      data: { 
        session: { 
          access_token: 'demo_token', 
          refresh_token: 'demo_refresh', 
          expires_in: 3600, 
          token_type: 'bearer', 
          user: DEMO_USER as any 
        } 
      }, 
      error: null 
    })
  }

  return supabase
}
