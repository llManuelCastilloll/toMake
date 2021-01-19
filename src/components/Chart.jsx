import React from 'react';
import { Line } from 'react-chartjs-2'

var data = {
  labels: ['Finalizadas', 'Corta', 'Media', 'Larga'],
  datasets: [
    {
      label: 'Tus actividades esta semana',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

export const Chart = props => {
    const { graphicData } = props;
    data.datasets[0].data  = graphicData

    return(
        <div className="chart">
            <Line data={data} options={options} />
        </div>
    )
};