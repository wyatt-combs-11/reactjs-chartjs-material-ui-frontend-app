import '../App.css';
import React from 'react'
import { Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, CategoryScale, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

const BarChart = (props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
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