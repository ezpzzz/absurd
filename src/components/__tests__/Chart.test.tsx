import { render, screen } from '@testing-library/react'
import Chart from '../Chart'

jest.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }): React.JSX.Element => <div data-testid="bar-chart">{children}</div>,
  Bar: (): React.JSX.Element => <div />,
  XAxis: (): React.JSX.Element => <div />,
  YAxis: (): React.JSX.Element => <div />,
  CartesianGrid: (): React.JSX.Element => <div />,
  Tooltip: (): React.JSX.Element => <div />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }): React.JSX.Element => <div>{children}</div>,
}))

test('renders chart title and rows', () => {
  render(<Chart title="Test Chart" data={[1,2,3]} />)
  screen.getByText('Test Chart')
  expect(screen.getAllByRole('row')).toHaveLength(4)
  expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
})
