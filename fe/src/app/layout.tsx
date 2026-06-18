import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth/auth-provider'
import { AppLayout } from '@/components/layout/app-layout'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CarbonIQ - AI-Powered Personal Carbon Intelligence',
  description: 'Understand, track, predict, and reduce your carbon footprint.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <AuthProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </AuthProvider>
            <Toaster position="top-right" />
          </ThemeProvider>
      </body>
    </html>
  )
}
