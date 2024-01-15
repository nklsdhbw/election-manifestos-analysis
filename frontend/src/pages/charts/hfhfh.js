import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import apple from "./apple.csv";
import email from "./email.csv";
import * as dfd from "danfojs";

const Hfhfh = () => {
  const [emailDataFrame, setEmailDataFrame] = useState(null);
  const [appleDataFrame, setAppleDataFrame] = useState(null);
  const emailChartRef = useRef(null);
  const appleChartRef = useRef(null);

  useEffect(() => {
    async function fetchCSVData(file) {
      try {
        const csv = await fetch(file).then((row) => row.text());
        let csvToArray = csv.split("\n");
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
      if (emailChartRef.current) {
        emailChartRef.current.destroy();
      }
      if (appleChartRef.current) {
        appleChartRef.current.destroy();
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
            backgroundColor: "#007bff",
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

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <canvas id="emailChart" width="400" height="200"></canvas>
      <canvas id="appleChart" width="400" height="200"></canvas>
    </div>
  );
};

export default Hfhfh;
