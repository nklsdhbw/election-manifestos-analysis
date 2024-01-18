import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import * as dfd from "danfojs";
import top_words from "../charts/data/SPD_top_worte.csv";
import apple from "../charts/data/apple.csv";
import email from "../charts/data/email.csv";

const Hfhfh = () => {
  const [emailDataFrame, setEmailDataFrame] = useState(null);
  const [appleDataFrame, setAppleDataFrame] = useState(null);
  const [topWordsDataFrame, setTopWordsDataFrame] = useState(null);
  const emailChartRef = useRef(null);
  const appleChartRef = useRef(null);
  const topWordsChartRef = useRef(null);
  const polarChartRef = useRef(null);

  useEffect(() => {
    async function fetchCSVData(file) {
      try {
        const csv = await fetch(file).then((row) => row.text());

        // Replace any occurrences of '\r' with an empty string to remove them.
        const cleanedCSV = csv.replace(/\r/g, "");

        let csvToArray = cleanedCSV.split("\n");
        let columns = csvToArray[0].split(",");
        let data = csvToArray.slice(1, csvToArray.length);
        let rows = [];
        data.forEach((row) => {
          row = row.split(",");
          rows.push(row);
        });
        let df = new dfd.DataFrame(rows, { columns: columns });
        df.print();
        return df;
      } catch (error) {
        console.error("Error fetching CSV data", error);
        return null;
      }
    }

    fetchCSVData(top_words)
      .then((dataFrame) => {
        if (dataFrame) {
          setTopWordsDataFrame(dataFrame);
        }
      })
      .catch((error) => {
        console.error("Error processing email CSV data", error);
      });

    fetchCSVData(email)
      .then((dataFrame) => {
        if (dataFrame) {
          setEmailDataFrame(dataFrame);
        }
      })
      .catch((error) => {
        console.error("Error processing email CSV data", error);
      });

    fetchCSVData(apple)
      .then((dataFrame) => {
        if (dataFrame) {
          setAppleDataFrame(dataFrame);
        }
      })
      .catch((error) => {
        console.error("Error processing apple CSV data", error);
      });

    return () => {
      if (topWordsChartRef.current) {
        topWordsChartRef.current.destroy();
      }
      if (emailChartRef.current) {
        emailChartRef.current.destroy();
      }
      if (appleChartRef.current) {
        appleChartRef.current.destroy();
      }
      if (polarChartRef.current) {
        polarChartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (emailDataFrame) {
      const emailData = {
        labels: emailDataFrame["Date"].values,
        datasets: [
          {
            label: "Email Dataset",
            data: emailDataFrame["Identifier"].values,
            backgroundColor: "#E3000F",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      };

      const emailConfig = {
        type: "bar",
        data: emailData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Email Chart",
            },
          },
        },
      };

      if (emailChartRef.current) {
        emailChartRef.current.destroy();
      }

      emailChartRef.current = new Chart("emailChart", emailConfig);
    }
  }, [emailDataFrame]);

  useEffect(() => {
    if (appleDataFrame) {
      const appleData = {
        labels: appleDataFrame["Date"].values,
        datasets: [
          {
            label: "Apple Dataset",
            data: appleDataFrame["Close"].values,
            backgroundColor: "#E3000F",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      };

      const appleConfig = {
        type: "line",
        data: appleData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Apple Stock Price Chart",
            },
          },
        },
      };

      if (appleChartRef.current) {
        appleChartRef.current.destroy();
      }

      appleChartRef.current = new Chart("appleChart", appleConfig);
    }
  }, [appleDataFrame]);

  useEffect(() => {
    if (topWordsDataFrame) {
      const topWordsData = {
        labels: topWordsDataFrame["Wort"].values,
        datasets: [
          {
            label: "Word Dataset",
            data: topWordsDataFrame["Anzahl"].values,
            backgroundColor: "#E3000F",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      };

      const topWordsConfig = {
        type: "bar",
        data: topWordsData,
        options: {
          indexAxis: "y",
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Top Words Chart",
            },
          },
        },
      };

      if (topWordsChartRef.current) {
        topWordsChartRef.current.destroy();
      }

      topWordsChartRef.current = new Chart("topWordsChart", topWordsConfig);
    }
  }, [topWordsDataFrame]);

  useEffect(() => {
    const polarData = {
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    const polarConfig = {
      type: 'polarArea',
      data: polarData,
      options: {
        responsive: true,
      }
    };

    if (polarChartRef.current) {
      polarChartRef.current.destroy();
    }

    polarChartRef.current = new Chart("polarChart", polarConfig);
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="items-center flex-row flex">
      <div style={{ width: '50%', height: '50%' }}>
      <canvas id="topWordsChart" ></canvas>
      </div>
      <div style={{ width: '50%', height: '50%' }}>
      <canvas id="emailChart" ></canvas>
      </div>
      </div>
      <div className="items-center flex-row flex">
      <div style={{ width: '50%', height: '50%' }}>
        <canvas id="appleChart"></canvas>
      </div>
      <div style={{ width: '50%', height: '50%' }}>
        <canvas id="polarChart"></canvas>
      </div>
      </div>
    </div>
  );
};

export default Hfhfh;
