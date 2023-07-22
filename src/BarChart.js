import React from 'react'
import { Chart as ChartJS, BarElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'

const BarChart = ({seriesData, seriesChoice}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip
    );

    // console.log(seriesData)
    console.log((seriesChoice['choice']['name']))
    const seriesName = seriesChoice['choice']['name']
    console.log(seriesName)
    seriesData = seriesData['data'][seriesName]
    console.log(seriesData)
      
    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     position: 'top',
            // },
            title: {
                display: true,
                text: seriesName,
            },
        },
    };
    
    const labels = seriesData['XData'];
    
    const data = {
        labels,
        datasets: [
            {
                data: seriesData['YData'],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <div>
                <Bar
                    data={data}
                    options={options}
                    width={400}
                />
            </div>

}

export default BarChart