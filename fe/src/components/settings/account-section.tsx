"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Shield, Key, AlertTriangle, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AccountSection() {
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const isDeleteEnabled = deleteConfirmation === 'DELETE'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Account Security</h2>
        <p className="text-muted-foreground">Manage your login methods and account security.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Email Address</CardTitle>
          <CardDescription>Update the email address associated with your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="current-email">Current Email</Label>
            <Input id="current-email" defaultValue="alex@example.com" disabled className="bg-muted/50" />
          </div>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="new-email">New Email</Label>
            <Input id="new-email" type="email" placeholder="Enter new email address" />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4">
          <Button>Update Email</Button>
        </CardFooter>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2 max-w-md">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-muted/20 px-6 py-4">
          <Button className="gap-2"><Key className="h-4 w-4" /> Update Password</Button>
        </CardFooter>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/30">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Authenticator App</p>
                <p className="text-sm text-muted-foreground">Not configured</p>
              </div>
            </div>
            <Button variant="outline">Set Up</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-destructive/20 overflow-hidden">
        <CardHeader className="bg-destructive/5">
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> 
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions for your account.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                Permanently delete your account and all of your data. This action cannot be undone.
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger render={<Button variant="destructive" className="shrink-0" />}>
                Delete Account
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription className="pt-3">
                    This action cannot be undone. This will permanently delete your account, wipe your carbon tracking history, and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirmation">
                      Please type <span className="font-bold select-all">DELETE</span> to confirm.
                    </Label>
                    <Input 
                      id="confirmation" 
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="Type DELETE"
                    />
                  </div>
                </div>
                
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline" onClick={() => setDeleteConfirmation('')} className="mt-2 sm:mt-0">Cancel</Button>
                  <Button variant="destructive" disabled={!isDeleteEnabled}>
                    Confirm Deletion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
