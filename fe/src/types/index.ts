/**
 * Represents the authenticated user structure
 */
export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

/**
 * Represents a logged carbon activity
 */
export interface Activity {
  id: string
  user_id: string
  activity_type: string
  description: string
  emissions_kg: number
  date: string
}

/**
 * Represents an active reduction goal
 */
export interface Goal {
  id: string
  user_id: string
  title: string
  description: string
  target_value: number
  current_value: number
  unit: string
  status: string
  created_at: string
}

/**
 * Represents a community post
 */
export interface CommunityPost {
  id: string
  user_id: string
  author_name: string
  content: string
  likes: number
  created_at: string
}
