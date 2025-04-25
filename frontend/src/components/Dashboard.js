import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function Dashboard({ history }) {
  useEffect(()=>{
    new Chart('myChart',{ type:'line',
      data:{
        labels: history.map(h=>h.date),
        datasets:[{label:'Cards Reviewed',data:history.map(h=>h.count)}]
      }
    });
  },[history]);

  return <canvas id="myChart" width="400" height="200"></canvas>;
}
