"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Activity, Database } from "lucide-react"

export default function DataReportsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Data & Reports</h2>
        <p className="text-muted-foreground">Export your carbon tracking data and generate reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card flex flex-col">
          <CardHeader>
            <div className="p-2 bg-primary/10 rounded-full text-primary w-fit mb-2">
              <FileText className="h-6 w-6" />
            </div>
            <CardTitle>Carbon Reports</CardTitle>
            <CardDescription>
              Export a comprehensive summary of your carbon footprint, including trends and AI insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button variant="outline" className="w-full gap-2"><Download className="h-4 w-4" /> Export PDF Report</Button>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col">
          <CardHeader>
            <div className="p-2 bg-accent text-accent-foreground rounded-full w-fit mb-2">
              <Activity className="h-6 w-6" />
            </div>
            <CardTitle>Activity History</CardTitle>
            <CardDescription>
              Download a raw CSV file containing all of your logged carbon activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button variant="outline" className="w-full gap-2"><Download className="h-4 w-4" /> Download CSV</Button>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col md:col-span-2">
          <CardHeader>
            <div className="p-2 bg-secondary text-secondary-foreground rounded-full w-fit mb-2">
              <Database className="h-6 w-6" />
            </div>
            <CardTitle>Account Data Archive</CardTitle>
            <CardDescription>
              Request a complete archive of all data associated with your CarbonIQ account. This includes your profile, settings, activities, and interactions with the AI coach. The archive will be emailed to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Request Data Archive</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
