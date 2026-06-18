"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, User } from "lucide-react"

export default function ProfileSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your public profile and personal details.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>This will be displayed on your public profile and leaderboards.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback className="text-3xl bg-primary/10 text-primary">
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload new picture
            </Button>
            <p className="text-xs text-muted-foreground">
              JPG, GIF or PNG. Max size of 2MB.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" defaultValue="Alex" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" defaultValue="Green" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="alexgreen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 000-0000" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="alex@example.com" disabled className="bg-muted/50 cursor-not-allowed" />
            <p className="text-xs text-muted-foreground">To change your email address, go to the Account section.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio" 
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue="Sustainability enthusiast and software developer."
            />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4">
          <Button className="ml-auto">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
