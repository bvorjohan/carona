import React, {useState, useEffect} from 'react';
import './App.css';
import { Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';



function MyChart() {


  const [data, setData] = useState([{}]);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (ignore) return
      // const result = await axios('https://covidtracking.com/api/us');
      const result = await axios('https://covidtracking.com/api/us/daily');
      if (!ignore) setData(result.data);
      if (!ignore) setDataLoaded(true);
    }
    fetchData();
    return () => { ignore = true; }

  },[]);

  return (
<div>
<h2>Daily Testing </h2>
      {
        (dataLoaded===true)
        ? <Line data={{
          labels: data.map(item => "" + Math.floor(item.date/10000) + "-" + Math.floor(item.date/100) % 1000 + "-" + item.date % 100),
          spanGaps: true,
          datasets: [

            // 'rgba(255, 99, 132, 0.8)',
            // 'rgba(54, 162, 235, 0.8)',
            // 'rgba(255, 206, 86, 0.8)',
            // 'rgba(75, 192, 192, 0.8)',

          //   {
          //     lineTension: 0,
          //     spanGaps: true,
          //
          //   label: '# of States',
          //   data: data.map((item,index) => {
          //     console.log(index,": ",item)
          //     return item.states
          //   }),
          //   backgroundColor: 'rgba(54, 162, 235, 0.8)',
          //   borderColor: 'rgba(54, 162, 235, 1)',
          //   borderWidth: 1
          // },
          {
            spanGaps: true,

          label: '# of Deaths',
          data: data.map((item,index) => {
            return item.death === null ? 0 : item.death
          }),
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
          {
            lineTension: 0,
            spanGaps: true,

          label: '# of Pending',
          data: data.map((item,index) => {
            return item.pending
          }),
          backgroundColor: 'rgba(255, 206, 86, 0.8)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          lineTension: 0,
          spanGaps: true,

        label: '# of Positive',
        data: data.map((item,index) => {
          return item.positive
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        lineTension: 0,
        spanGaps: true,

      label: '# of Negative',
      data: data.map((item,index) => {
        return item.negative
      }),
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    },

        ]

        }}/>
        // <Doughnut data={{
        //     labels: ['Positive', 'Negative', 'Pending', 'Dead'],
        //     datasets: [{
        //         label: '# of Tests',
        //         data: [
        //           data[0].positive,
        //           data[0].negative,
        //           data[0].pending,
        //           data[0].death,
        //         ],
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.8)',
        //             'rgba(54, 162, 235, 0.8)',
        //             'rgba(255, 206, 86, 0.8)',
        //             'rgba(75, 192, 192, 0.8)',
        //             'rgba(153, 102, 255, 0.8)',
        //             'rgba(255, 159, 64, 0.8)'
        //         ],
        //         borderColor: [
        //             'rgba(255, 99, 132, 1)',
        //             'rgba(54, 162, 235, 1)',
        //             'rgba(255, 206, 86, 1)',
        //             'rgba(75, 192, 192, 1)',
        //             'rgba(153, 102, 255, 1)',
        //             'rgba(255, 159, 64, 1)'
        //         ],
        //         borderWidth: 1
        //     }]
        // }}/>
        : <p>Loading...</p>
      }

</div>
  );
}

export default MyChart;
