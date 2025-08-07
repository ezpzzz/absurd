import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartProps {
  title: string
  data: number[]
}

const Chart: React.FC<ChartProps> = ({ title, data }) => {
  const chartData = data.map((value, idx) => ({
    name: `Item ${idx + 1}`,
    value,
  }))

  return (
    <figure>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="rgba(75, 192, 192, 0.8)" />
        </BarChart>
      </ResponsiveContainer>
      <figcaption>{title}</figcaption>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, idx) => (
            <tr key={idx}>
              <td>{`Item ${idx + 1}`}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

export default Chart
