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
        plugins: {
            // legend: {
            //     position: 'top',
            // },
            title: {
                display: true,
                text: (seriesName + " Series"),
            },
        },
    };
    
    const labels = seriesData['XData'];
    
    const data = {
       labels,
        datasets: [
            {
                data: seriesData['YData'],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
            }
        ],
    };

    return <div>
                <Bar
                    data={data}
                    options={options}
                />
            </div>

}

export default BarChart