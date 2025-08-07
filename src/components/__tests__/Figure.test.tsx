import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Figure from '../Figure'

vi.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
}))

describe('Figure', () => {
  it('renders chart with alt text and table snapshot', () => {
    const { container } = render(<Figure title="Test Chart" data={[1, 2, 3]} />)
    screen.getByTestId('responsive-container')
    screen.getByText('Test Chart')
    expect(container).toMatchSnapshot()
  })
})
