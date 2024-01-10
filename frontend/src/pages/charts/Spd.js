import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Spd = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Example Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#E3000F',
        borderColor: 'black)',
        borderWidth: 1,
      }],
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
      },
    };

    if (chartRef.current) {
      // If the chart already exists, destroy it first
      chartRef.current.destroy();
    }

    // Create a new chart on the canvas element
    chartRef.current = new Chart("showChartAfd", config);

    return () => {
      // Cleanup: destroy the chart when the component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <canvas id="showChartAfd" width="400" height="200"></canvas>
    </div>
  );
};

export default Spd;
