import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const Chart = ({ title, data }) => {
    const chartData = data.map((value, idx) => ({
        name: `Item ${idx + 1}`,
        value,
    }));
    return (_jsxs("figure", { children: [_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: chartData, margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "value", fill: "rgba(75, 192, 192, 0.8)" })] }) }), _jsx("figcaption", { children: title }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Label" }), _jsx("th", { children: "Value" })] }) }), _jsx("tbody", { children: data.map((value, idx) => (_jsxs("tr", { children: [_jsx("td", { children: `Item ${idx + 1}` }), _jsx("td", { children: value })] }, idx))) })] })] }));
};
export default Chart;
