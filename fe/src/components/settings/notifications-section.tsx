"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">Manage how and when you receive updates from CarbonIQ.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure which emails you'd like to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-medium">Weekly Reports</Label>
              <span className="text-sm text-muted-foreground">Receive a weekly digest of your carbon footprint and trends.</span>
            </div>
            <Switch id="weekly-reports" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-medium">AI Insights</Label>
              <span className="text-sm text-muted-foreground">Get personalized recommendations from the AI Coach.</span>
            </div>
            <Switch id="ai-insights" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>Control alerts within the application interface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-medium">Goal Reminders</Label>
              <span className="text-sm text-muted-foreground">Alerts when you are close to hitting or exceeding a goal.</span>
            </div>
            <Switch id="goal-reminders" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <div className="flex flex-col space-y-1">
              <Label className="text-base font-medium">Achievement Notifications</Label>
              <span className="text-sm text-muted-foreground">Celebrate milestones, new badges, and leaderboard rankings.</span>
            </div>
            <Switch id="achievements" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4">
          <Button className="ml-auto">Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
