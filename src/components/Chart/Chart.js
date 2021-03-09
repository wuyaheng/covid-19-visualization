import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

const Chart = (props) => {

    const BarChart = () => {
        const colorArray = [
            "#238b45",
            "#d7301f",
            "#525252"
          ];
    
        let options = {
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: true,
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
            display: false
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
                display: true
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
                labels: ["Recovered", "Confirmed", "Deaths" ],
                datasets: [
                  {
                    data: [props.newdata?.recovered?.value, props.newdata?.confirmed?.value, props.newdata?.deaths?.value], 
                    backgroundColor: colorArray
                  },
                ],
              }}
              options={options} 
              height={350}
            />
          );
    
      };

    return (
        <>
         <BarChart />
        </>
    )
}
export default Chart;


