import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { getActivities, getGoals } from '@/lib/api';
import { createClient } from '@/lib/supabase';

// Mock dependencies
jest.mock('@/lib/api', () => ({
  getActivities: jest.fn(),
  getGoals: jest.fn(),
}));

jest.mock('@/lib/supabase', () => ({
  createClient: jest.fn(),
}));

jest.mock('@/components/dashboard/premium-hero', () => ({
  PremiumHero: () => <div data-testid="premium-hero">Hero</div>
}));
jest.mock('@/components/dashboard/premium-kpis', () => ({
  PremiumKPIs: () => <div data-testid="premium-kpis">KPIs</div>
}));
jest.mock('@/components/dashboard/premium-emissions-analytics', () => ({
  PremiumEmissionsAnalytics: () => <div data-testid="premium-emissions">Emissions</div>
}));
jest.mock('@/components/dashboard/premium-emission-breakdown', () => ({
  PremiumEmissionBreakdown: () => <div data-testid="premium-breakdown">Breakdown</div>
}));
jest.mock('@/components/dashboard/premium-ai-insights', () => ({
  PremiumAIInsights: () => <div data-testid="premium-insights">Insights</div>
}));
jest.mock('@/components/dashboard/premium-active-goals', () => ({
  PremiumActiveGoals: () => <div data-testid="premium-goals">Goals</div>
}));
jest.mock('@/components/dashboard/premium-recent-activity', () => ({
  PremiumRecentActivity: () => <div data-testid="premium-activity">Activity</div>
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (createClient as jest.Mock).mockReturnValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }) },
    });
    (getActivities as jest.Mock).mockResolvedValue([]);
    (getGoals as jest.Mock).mockResolvedValue([]);

    render(<DashboardPage />);
    expect(screen.getByText(/Loading your dashboard.../i)).toBeInTheDocument();
  });

  it('renders dashboard components after loading data', async () => {
    (createClient as jest.Mock).mockReturnValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: '123' } }, error: null }) },
    });
    (getActivities as jest.Mock).mockResolvedValue([{ id: '1', emissions_kg: 10 }]);
    (getGoals as jest.Mock).mockResolvedValue([{ id: '1', title: 'Goal 1' }]);

    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByTestId('premium-hero')).toBeInTheDocument();
    });

    expect(screen.getByTestId('premium-kpis')).toBeInTheDocument();
    expect(screen.getByTestId('premium-emissions')).toBeInTheDocument();
    expect(screen.getByTestId('premium-breakdown')).toBeInTheDocument();
    expect(screen.getByTestId('premium-insights')).toBeInTheDocument();
    expect(screen.getByTestId('premium-goals')).toBeInTheDocument();
    expect(screen.getByTestId('premium-activity')).toBeInTheDocument();
  });

  it('renders error state on API failure', async () => {
    (createClient as jest.Mock).mockReturnValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: '123' } }, error: null }) },
    });
    (getActivities as jest.Mock).mockRejectedValue(new Error('API Error'));
    (getGoals as jest.Mock).mockResolvedValue([]);

    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText(/Oops, something went wrong/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
  });
});
