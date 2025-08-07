import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Figure from '../Figure';
vi.mock('recharts', () => ({
    BarChart: ({ children }) => _jsx("div", { "data-testid": "bar-chart", children: children }),
    Bar: () => _jsx("div", { "data-testid": "bar" }),
    XAxis: () => _jsx("div", { "data-testid": "x-axis" }),
    YAxis: () => _jsx("div", { "data-testid": "y-axis" }),
    CartesianGrid: () => _jsx("div", { "data-testid": "grid" }),
    Tooltip: () => _jsx("div", { "data-testid": "tooltip" }),
    ResponsiveContainer: ({ children }) => _jsx("div", { "data-testid": "responsive-container", children: children }),
}));
describe('Figure', () => {
    it('renders chart with alt text and table snapshot', () => {
        const { container } = render(_jsx(Figure, { title: "Test Chart", data: [1, 2, 3] }));
        screen.getByTestId('responsive-container');
        screen.getByText('Test Chart');
        expect(container).toMatchSnapshot();
    });
});
