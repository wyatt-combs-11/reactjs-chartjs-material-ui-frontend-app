import '../css/App.css'
import React from 'react'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  CategoryScale,
  ArcElement,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2'

const PieChart = props => {
  ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend)
  const seriesName = props.seriesChoice
  const seriesData = props.seriesData[seriesName]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      title: false
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }

  const labels = seriesData['XData']

  const data = {
    labels,
    datasets: [
      {
        data: seriesData['YData'],
        backgroundColor: props.colors
      }
    ]
  }
  if (props.index !== props.chartIndex) {
    return
  }
  return (
    <div className='Resizable'>
      <Pie data={data} options={options} />
    </div>
  )
}

export default PieChart
