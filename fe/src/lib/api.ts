import { createClient } from './supabase'
import type { Activity, Goal } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'
const USE_MOCK_FALLBACK = process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK !== 'false'

const getMockResponse = async <T = any>(endpoint: string): Promise<T | null> => {
  const mocks = await import('./mock-data')

  if (endpoint.startsWith('/activities')) return mocks.MOCK_ACTIVITIES as T
  if (endpoint.startsWith('/goals')) return mocks.MOCK_GOALS as T
  if (endpoint.startsWith('/community')) return mocks.MOCK_COMMUNITY_POSTS as T
  if (endpoint.startsWith('/forecasting')) {
    const currentTotal = mocks.MOCK_ACTIVITIES.reduce((sum, activity) => sum + activity.emissions_kg, 0)
    return {
      current_total: currentTotal,
      projected_next_month: currentTotal * 0.92,
      trend: 'down',
    } as T
  }
  if (endpoint.startsWith('/coach/weekly-plan')) {
    return {
      plan: [
        '- Replace two short car trips with cycling or walking this week.',
        '- Add one plant-based dinner to lower diet emissions.',
        '- Shift one laundry load to cold water and air dry when possible.',
      ].join('\n'),
    } as T
  }

  return null
}

/**
 * Generic fetch wrapper for authenticated API calls.
 * Automatically injects the Supabase JWT into the Authorization header.
 * 
 * @template T The expected return type of the API response.
 * @param {string} endpoint - The API endpoint to fetch (e.g., '/activities').
 * @param {RequestInit} [options={}] - Standard Fetch API options.
 * @returns {Promise<T>} The parsed JSON response.
 * @throws Will throw an error if the network request fails or returns a non-2xx status.
 */
export const fetchApi = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  const headers = new Headers(options.headers)
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`)
  }

  // Set default Content-Type to JSON if not provided and it's not FormData
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const url = `${API_BASE_URL}${endpoint}`
  // --- DEMO MODE INTERCEPTION ---
  if (typeof document !== 'undefined' && document.cookie.includes('carboniq_demo=true')) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockResponse = await getMockResponse<T>(endpoint)
    return mockResponse ?? ([] as T)
  }
  // --- END DEMO MODE ---

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `API request failed: ${response.statusText || response.status}`)
    }

    return response.json()
  } catch (error) {
    if (options.method && options.method !== 'GET') {
      throw error
    }

    if (USE_MOCK_FALLBACK) {
      const mockResponse = await getMockResponse<T>(endpoint)
      if (mockResponse !== null) return mockResponse
    }

    throw error
  }
}

/**
 * Fetches all logged activities for the current user.
 * @returns {Promise<Activity[]>} An array of Activity objects.
 */
export const getActivities = async (): Promise<Activity[]> => {
  return fetchApi<Activity[]>('/activities')
}

/**
 * Fetches all active reduction goals for the current user.
 * @returns {Promise<Goal[]>} An array of Goal objects.
 */
export const getGoals = async (): Promise<Goal[]> => {
  return fetchApi<Goal[]>('/goals')
}
