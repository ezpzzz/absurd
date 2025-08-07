import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Figure from '../Figure'

vi.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }): React.JSX.Element => <div data-testid="bar-chart">{children}</div>,
  Bar: (): React.JSX.Element => <div data-testid="bar" />,
  XAxis: (): React.JSX.Element => <div data-testid="x-axis" />,
  YAxis: (): React.JSX.Element => <div data-testid="y-axis" />,
  CartesianGrid: (): React.JSX.Element => <div data-testid="grid" />,
  Tooltip: (): React.JSX.Element => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }): React.JSX.Element => <div data-testid="responsive-container">{children}</div>,
}))

describe('Figure', () => {
  it('renders chart with alt text and table snapshot', () => {
    const { container } = render(<Figure title="Test Chart" data={[1, 2, 3]} />)
    screen.getByTestId('responsive-container')
    screen.getByText('Test Chart')
    expect(container).toMatchSnapshot()
  })
})
