import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

const Chart = (props) => {

    const BarChart = () => {
        const colorArray = [
            "rgba(252, 141, 89, 0.8)",
            "rgba(102, 194, 164, 0.8)",
            "rgba(150, 150, 150, 0.8)"
          ];
    
        let options = {
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return parseInt(tooltipValue).toLocaleString();
              }
            }
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            labels: {
              render: 'value',
              precision: 0,
              showZero: true,
              fontSize: 13,
              fontColor: '#fff',
              arc: false,
              showActualPercentages: true,
              outsidePadding: 4,
              textMargin: 4
            }
          },
          title: {
            display: true,
            fontSize: 16,
            fontStyle: 400,
            fontColor: "#555555",
            text: props.newcountry != ''? props.newcountry + ' Covid-19 Cases': 'Global Covid-19 Cases'  
         },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  display: true
                }
              }
            ],
            yAxes: [{
              ticks: {
                display: true,
                callback(value) {
                    return Number(value).toLocaleString('en')
                  }
              },
              gridLines: {
                display: true
              }
          }]
          }
        };
    
         return (
            <Bar
              data={{
                labels: ["Confirmed", "Recovered", "Deaths" ],
                datasets: [
                  {
                    data: [props.newdata?.confirmed?.value, props.newdata?.recovered?.value, props.newdata?.deaths?.value], 
                    backgroundColor: colorArray
                  },
                ],
              }}
              options={options} 
            />
          );
    
      };

    return (

        <div className="card lineChartCard">
         <BarChart />
         </div>

    )
}
export default Chart;


