import type { Activity, Goal, User, CommunityPost } from '@/types'

export const DEMO_USER: User = {
  id: "demo-user",
  email: "demo@carboniq.ai",
  user_metadata: {
    full_name: "Demo User"
  }
}

export const MOCK_ACTIVITIES: Activity[] = [
  { id: "a1", user_id: "demo", activity_type: "Transport", description: "Daily Commute (Gasoline Car)", emissions_kg: 8.5, date: new Date().toISOString() },
  { id: "a2", user_id: "demo", activity_type: "Diet", description: "Vegetarian Lunch", emissions_kg: 1.2, date: new Date(Date.now() - 86400000).toISOString() },
  { id: "a3", user_id: "demo", activity_type: "Energy", description: "Home Electricity Usage", emissions_kg: 12.4, date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "a4", user_id: "demo", activity_type: "Transport", description: "Cycled to the Park", emissions_kg: 0, date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: "a5", user_id: "demo", activity_type: "Shopping", description: "Bought Sustainable Clothing", emissions_kg: 4.0, date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: "a6", user_id: "demo", activity_type: "Diet", description: "Chicken Dinner", emissions_kg: 4.8, date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "a7", user_id: "demo", activity_type: "Energy", description: "Natural Gas Heating", emissions_kg: 6.1, date: new Date(Date.now() - 86400000 * 6).toISOString() },
  { id: "a8", user_id: "demo", activity_type: "Transport", description: "Train Travel", emissions_kg: 2.1, date: new Date(Date.now() - 86400000 * 7).toISOString() },
  { id: "a9", user_id: "demo", activity_type: "Shopping", description: "Grocery Shopping (Local Produce)", emissions_kg: 1.5, date: new Date(Date.now() - 86400000 * 8).toISOString() },
]

export const MOCK_GOALS: Goal[] = [
  {
    id: "g1", user_id: "demo", title: "Meatless Mondays", description: "Commit to eating vegetarian meals every Monday to significantly reduce dietary emissions.",
    target_value: 4, current_value: 3, unit: "days", status: "In Progress", created_at: new Date(Date.now() - 86400000 * 20).toISOString()
  },
  {
    id: "g2", user_id: "demo", title: "Commute by Bike", description: "Cycle to work at least twice a week instead of driving.",
    target_value: 8, current_value: 4, unit: "trips", status: "In Progress", created_at: new Date(Date.now() - 86400000 * 14).toISOString()
  },
  {
    id: "g3", user_id: "demo", title: "Switch to LEDs", description: "Replace all home light bulbs with energy-efficient LEDs.",
    target_value: 10, current_value: 10, unit: "bulbs", status: "Completed", created_at: new Date(Date.now() - 86400000 * 45).toISOString()
  },
  {
    id: "g4", user_id: "demo", title: "Zero Waste Groceries", description: "Bring reusable bags and containers to the supermarket.",
    target_value: 5, current_value: 1, unit: "trips", status: "In Progress", created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  }
]

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  { id: "p1", user_id: "demo", author_name: "Demo User", content: "Just completed my 'Switch to LEDs' goal! My electricity usage is already down.", likes: 12, created_at: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: "p2", user_id: "other1", author_name: "Sarah Jenkins", content: "Managed to cycle to work all 5 days this week. Feeling great and saving carbon!", likes: 24, created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "p3", user_id: "other2", author_name: "Mike Chen", content: "Does anyone have good recipes for a plant-based diet? Trying to hit my Meatless Monday goals.", likes: 8, created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
]
