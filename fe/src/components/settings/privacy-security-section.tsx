"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Laptop, LogOut, Clock } from "lucide-react"

export default function PrivacySecuritySection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Privacy & Security</h2>
        <p className="text-muted-foreground">Manage your active sessions and connected devices.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Devices that are currently logged into your account.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out all
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/20">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Laptop className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Windows PC • Chrome</p>
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">Current</span>
                </div>
                <p className="text-sm text-muted-foreground">New York, USA • IP: 192.168.1.1</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-full text-muted-foreground">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">iPhone 14 Pro • Safari</p>
                <p className="text-sm text-muted-foreground">New York, USA • Last active 2 hours ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">Sign Out</Button>
          </div>

        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login attempts to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: 'Success', date: 'Today, 10:45 AM', device: 'Windows PC • Chrome', location: 'New York, USA' },
              { status: 'Success', date: 'Yesterday, 8:20 PM', device: 'iPhone 14 Pro • Safari', location: 'New York, USA' },
              { status: 'Failed', date: 'Oct 12, 3:15 AM', device: 'Unknown Device', location: 'Moscow, RU' },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{log.device}</p>
                    <p className="text-xs text-muted-foreground">{log.date} • {log.location}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  log.status === 'Success' ? 'bg-primary/15 text-primary' : 'bg-destructive/15 text-destructive'
                }`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
