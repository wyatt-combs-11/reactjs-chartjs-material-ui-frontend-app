import '../App.css';
import React from 'react'
import { Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

const BarChart = (props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip
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
        scales: {
            x: {
                ticks: {
                  display: false,
                },
            },
            y: {
                ticks: {
                    color: '#FFFFFF',
                },
            },
        },
    };
    
    const labels = seriesData['XData'];
    
    const data = {
       labels,
        datasets: [
            {
                data: seriesData['YData'],
                backgroundColor: props.colors,
            }
        ],
    };

    if (props.index !== props.chartIndex) {
        return
    }
    return <div className='Resizable'>
                <Bar
                    data={data}
                    options={options}
                />
            </div>

}

export default BarChart