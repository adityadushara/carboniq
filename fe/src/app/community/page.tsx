"use client"
import { useState } from "react"
import { CommunityHero } from "@/components/community/community-hero"
import { CommunityFeed } from "@/components/community/community-feed"
import { PostCreationModal } from "@/components/community/post-creation-modal"
import { DiscussionForums } from "@/components/community/discussion-forums"
import { MemberSpotlight } from "@/components/community/member-spotlight"
import { TrendingInsights } from "@/components/community/trending-insights"
import { CommunityChallengesEvents } from "@/components/community/community-challenges-events"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  return (
    <div className="relative pb-24">
      {/* Content */}
      <div className="space-y-8">
        <CommunityHero onOpenPostModal={() => setIsPostModalOpen(true)} />

        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 md:grid-cols-4 mb-8 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="feed">Social Feed</TabsTrigger>
            <TabsTrigger value="forums">Forums</TabsTrigger>
            <TabsTrigger value="challenges">Challenges & Events</TabsTrigger>
            <TabsTrigger value="network">My Network</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Main Feed */}
              <div className="w-full lg:w-2/3 xl:w-3/4">
                <CommunityFeed />
              </div>
              
              {/* Right Sidebar Widgets */}
              <div className="w-full lg:w-1/3 xl:w-1/4 space-y-6">
                <MemberSpotlight />
                <TrendingInsights />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forums" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <DiscussionForums />
          </TabsContent>

          <TabsContent value="challenges" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <CommunityChallengesEvents />
          </TabsContent>

          <TabsContent value="network" className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl gap-4 mt-0">
            <p className="text-muted-foreground">Find and connect with friends to build your eco-network.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">Find Friends</button>
          </TabsContent>
        </Tabs>
      </div>

      <PostCreationModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
    </div>
  )
}
