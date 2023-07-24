import '../App.css';
import React from 'react'
import { Chart as ChartJS, Title, Tooltip, CategoryScale, ArcElement, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

const PieChart = (props) => {
    ChartJS.register(
        CategoryScale,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );
    const seriesName = props.seriesChoice
    const seriesData = props.seriesData[seriesName]
      
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: false,
            title: false,
        },
        elements: {
            arc: {
                borderWidth: 2, // <-- Set this to derired value
                borderColor:'#333'
            }
        },
    };
    
    const labels = seriesData['XData'];
    
    const data = {
       labels,
        datasets: [
            {
                data: seriesData['YData'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)'
                  ],
            }
        ],
    };
    if (props.index !== props.chartIndex) {
        return
    }
    return <div className='Resizable Circular Pie'>
                <Pie
                    data={data}
                    options={options}
                />
            </div>

}

export default PieChart