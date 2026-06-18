"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function CarbonPreferencesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Carbon Preferences</h2>
        <p className="text-muted-foreground">Set your sustainability goals and tracking preferences.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Tracking Goals</CardTitle>
          <CardDescription>Set targets to help reduce your carbon footprint.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="monthly-target">Monthly Carbon Target (kg CO₂e)</Label>
            <Input id="monthly-target" type="number" defaultValue="450" />
            <p className="text-xs text-muted-foreground">The average person emits about 400-500kg per month.</p>
          </div>
          
          <div className="space-y-2 max-w-md pt-2">
            <Label htmlFor="primary-goal">Primary Sustainability Goal</Label>
            <select 
              id="primary-goal" 
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue="reduce-transport"
            >
              <option value="reduce-overall">Reduce Overall Footprint</option>
              <option value="reduce-transport">Reduce Transportation Emissions</option>
              <option value="reduce-energy">Reduce Home Energy Usage</option>
              <option value="dietary-changes">Shift to Plant-based Diet</option>
            </select>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4">
          <Button>Save Goals</Button>
        </CardFooter>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Regional & Display Settings</CardTitle>
          <CardDescription>Customize how your data is calculated and displayed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="units">Preferred Units</Label>
              <select 
                id="units" 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                defaultValue="metric"
              >
                <option value="metric">Metric (kg, tonnes, km)</option>
                <option value="imperial">Imperial (lbs, miles)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Country / Region</Label>
              <select 
                id="region" 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                defaultValue="us"
              >
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="eu">European Union</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="other">Other</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">Used to provide accurate baseline emission factors.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4">
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
