import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface FigureProps {
  title: string
  data: number[]
}

const Figure: React.FC<FigureProps> = ({ title, data }) => {
  const chartData = {
    labels: data.map((_, idx) => `Item ${idx + 1}`),
    datasets: [
      {
        label: title,
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  }

  return (
    <figure>
      <Bar data={chartData} aria-label={title} role="img" />
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

export default Figure
