"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function IntegrationsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">Manage connections to third-party services and APIs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Google Integration */}
        <Card className="glass-card flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-1.5 rounded-md shadow-sm border">
                <svg className="h-6 w-6" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Google</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium text-primary">Connected</span>
                </div>
              </div>
            </div>
            <CardDescription>
              Sign in with Google and sync your calendar to estimate travel emissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-4">
            <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">Disconnect</Button>
          </CardContent>
        </Card>

        {/* Gemini AI Integration */}
        <Card className="glass-card flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1E1E1E] p-1.5 rounded-md shadow-sm border">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 21C11.6667 19.3333 11.2333 17.8167 10.3667 16.45C9.5 15.0833 8.35 14.05 6.91667 13.35C8.35 12.65 9.5 11.6167 10.3667 10.25C11.2333 8.88333 11.6667 7.36667 11.6667 5.7C11.6667 7.36667 12.1167 8.88333 13.0167 10.25C13.9167 11.6167 15.0833 12.65 16.5167 13.35C15.0833 14.05 13.9167 15.0833 13.0167 16.45C12.1167 17.8167 11.6667 19.3333 11.6667 21ZM16.3667 10.1C16.3667 8.93333 16.05 7.86667 15.4167 6.9C14.7833 5.93333 13.9667 5.2 12.9667 4.7C13.9667 4.2 14.7833 3.46667 15.4167 2.5C16.05 1.53333 16.3667 0.466667 16.3667 -0.7C16.3667 0.466667 16.6667 1.53333 17.2667 2.5C17.8667 3.46667 18.6667 4.2 19.6667 4.7C18.6667 5.2 17.8667 5.93333 17.2667 6.9C16.6667 7.86667 16.3667 8.93333 16.3667 10.1Z" fill="#A8C7FA"/>
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Gemini AI</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium text-primary">Connected</span>
                </div>
              </div>
            </div>
            <CardDescription>
              Power your sustainability coach and receipt scanning with Google Gemini API.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-4">
            <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">Disconnect</Button>
          </CardContent>
        </Card>

        {/* Supabase Integration */}
        <Card className="glass-card flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#1C1C1C] p-1.5 rounded-md shadow-sm border">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V12" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7L12 12L2 7" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg">Supabase</CardTitle>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium text-primary">Connected</span>
                </div>
              </div>
            </div>
            <CardDescription>
              Database and authentication backend for securely storing your data.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-4">
            <Button variant="outline" className="w-full" disabled>Required Service</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
