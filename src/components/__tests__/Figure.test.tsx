import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Figure from '../Figure'

vi.mock('react-chartjs-2', () => ({
  Bar: (props: any) => <canvas {...props} />,
}), { virtual: true })

vi.mock('chart.js', () => ({
  Chart: { register: () => {} },
  CategoryScale: {},
  LinearScale: {},
  BarElement: {},
  Tooltip: {},
  Legend: {},
}), { virtual: true })

describe('Figure', () => {
  it('renders chart with alt text and table snapshot', () => {
    const { container } = render(<Figure title="Test Chart" data={[1, 2, 3]} />)
    screen.getByRole('img', { name: 'Test Chart' })
    screen.getByText('Test Chart')
    expect(container).toMatchSnapshot()
  })
})
