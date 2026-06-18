import { render, screen } from '@testing-library/react';
import TrackPage from '@/app/track/page';

jest.mock('@/components/tracking/tracking-form', () => ({
  TrackingForm: () => <div data-testid="tracking-form">Form</div>
}));

jest.mock('@/components/tracking/receipt-scanner', () => ({
  ReceiptScanner: () => <div data-testid="receipt-scanner">Scanner</div>
}));

describe('TrackPage', () => {
  it('renders track page components', () => {
    render(<TrackPage />);
    expect(screen.getByText(/Log Activity/i)).toBeInTheDocument();
    expect(screen.getByTestId('tracking-form')).toBeInTheDocument();
    expect(screen.getByTestId('receipt-scanner')).toBeInTheDocument();
  });
});
