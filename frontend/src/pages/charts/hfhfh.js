import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import * as dfd from "danfojs";
import top_words from "../charts/data/SPD_top_worte.csv";
import apple from "../charts/data/apple.csv";
import email from "../charts/data/email.csv";
import similarities from "../charts/data/similarities/AFD - similarities.csv";
import sentiments from "../charts/data/sentiments/sentiment_characteristics.csv";
import topics from "../charts/data/labels/FDP.csv";

const Hfhfh = () => {
  const COLORSBUBBLE = {"SPD": "#E3000F", "AFD": "#0489DB", "FDP": "#FFEF00", "B90 / Die Grünen":"#1AA037", "CDU CSU": "#000000", "Die Linke": "rgb(86,14,50)"}
  const COLORS = {"SPD": "#E3000F", "AFD": "#0489DB", "FDP": "#FFEF00", "Die Grünen":"#1AA037", "CDU & CSU": "#000000", "Die Linke": "rgb(86,14,50)"}
  const [emailDataFrame, setEmailDataFrame] = useState(null);
  const [appleDataFrame, setAppleDataFrame] = useState(null);
  const [topWordsDataFrame, setTopWordsDataFrame] = useState(null);
  const [similarityDataFrame, setSimilarityDataFrame] = useState(null);
  const [sentimentDataFrame, setSentimentDataFrame] = useState(null);
  const [topicsDataFrame, setTopicsDataFrame] = useState(null);
  const emailChartRef = useRef(null);
  const appleChartRef = useRef(null);
  const topWordsChartRef = useRef(null);
  const polarChartRef = useRef(null);
  const bubbleChartRef = useRef(null);
  const topicsChartRef = useRef(null);

  useEffect(() => {
    async function fetchCSVData(file) {
      try {
        const csv = await fetch(file).then((row) => row.text());
        console.log(csv);
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

    fetchCSVData(similarities)
      .then((dataFrame) => {
        if (dataFrame) {
          setSimilarityDataFrame(dataFrame);
        }
      })
      .catch((error) => {
        console.error("Error processing apple CSV data", error);
      });

    fetchCSVData(sentiments)
      .then((dataFrame) => {
        if (dataFrame) {
          setSentimentDataFrame(dataFrame);
          console.log(dataFrame);
        }
      })
      .catch((error) => {
        console.error("Error processing apple CSV data", error);
      });

    fetchCSVData(topics)
      .then((dataFrame) => {
        if (dataFrame) {
          setTopicsDataFrame(dataFrame);
          console.log(dataFrame);
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
      if (bubbleChartRef.current) {
        bubbleChartRef.current.destroy();
      }
      if (topicsChartRef.current) {
        topicsChartRef.current.destroy();
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
        options: {devicePixelRatio:6,
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
        options: {devicePixelRatio:6,
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
        options: {devicePixelRatio:6,
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
              display: false
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
    if (similarityDataFrame) {
      const polarData = {
        labels: similarityDataFrame["party"].values,
        datasets: [
          {
            label: "",
            data: similarityDataFrame["similarity"].values, //[10, 20, 30, 40, 50],
            backgroundColor: similarityDataFrame["party"].values.map((key) => COLORS[key]),
          },
        ],
      };

      const polarConfig = {
        type: "polarArea",
        data: polarData,
        options: {devicePixelRatio:6,
          responsive: true,
        },
      };

      if (polarChartRef.current) {
        polarChartRef.current.destroy();
      }

      polarChartRef.current = new Chart("polarChart", polarConfig);
    }
  }, [similarityDataFrame]);

  useEffect(() => {
    if (sentimentDataFrame) {
      let x = sentimentDataFrame["Positiv"].values;
      let y = sentimentDataFrame["Negativ"].values;
      let r = sentimentDataFrame["Sentences"].values;
      // get sum of r

      const sum = r.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      // create an array of objects like {x: 10, y: 20, r: 5}
      const dataArray = x.map((value, index) => ({
        x: parseFloat(value),
        y: parseFloat(y[index]),
        r: parseFloat(Math.round((r[index] / sum) * 100, 2)),
      }));

      const bubbleData = {
        labels: sentimentDataFrame["Partei"].values,
        datasets: [
          {
            label: "",
            data: dataArray,
            backgroundColor: sentimentDataFrame["Partei"].values.map((key) => COLORSBUBBLE[key]),
            hoverBackgroundColor: sentimentDataFrame["Partei"].values.map((key) => COLORSBUBBLE[key])
          },
        ],
      };

      const bubbleConfig = {
        type: "bubble",
        data: bubbleData,
        options: {devicePixelRatio:6,
          scales: {y: {title: {display: true, text: "Negative Sentiment"}, ticks: {callback: function(value) {
            return value.toFixed(1) + '%'}}}, x: {title: {display: true, text: "Positive Sentiment"},ticks: {callback: function(value) {
              return value.toFixed(1) + '%'}}}},
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              display: false
            },
            title: {
              display: true,
              text: "Verhältnis von positiven und negativen Sätzen je Partei",
            },  
          }
        },
      };

      if (bubbleChartRef.current) {
        bubbleChartRef.current.destroy();
      }

      bubbleChartRef.current = new Chart("bubbleChart", bubbleConfig);
    }
  }, [sentimentDataFrame]);

  useEffect(() => {
    if (topicsDataFrame) {
      const topicsData = {
        labels: topicsDataFrame["Label"].values,
        datasets: [
          {
            label: "Topics Dataset",
            data: topicsDataFrame["Percentage"].values,
            backgroundColor: "#E3000F",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      };

      const topicsConfig = {
        type: "bar",
        data: topicsData,
        options: {devicePixelRatio:6,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              display: false
            },
            title: {
              display: true,
              text: "Relative Verteilung der Topics",
            },
          },
        },
      };

      if (topicsChartRef.current) {
        topicsChartRef.current.destroy();
      }

      topicsChartRef.current = new Chart("topicsChart", topicsConfig);
    }
  }, [topicsDataFrame]);

  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="items-center flex-row flex">
        <div style={{ width: "50%", height: "50%" }}>
          <canvas id="topWordsChart"></canvas>
        </div>
        <div style={{ width: "50%", height: "50%" }}>
          <canvas id="emailChart"></canvas>
        </div>
      </div>
      <div className="items-center flex-row flex">
        <div style={{ width: "50%", height: "50%" }}>
          <canvas id="appleChart"></canvas>
        </div>
        <div style={{ width: "50%", height: "50%" }}>
          <canvas id="polarChart"></canvas>
        </div>
      </div>
      <div className="items-center flex-row flex">
        <div style={{ width: "50%", height: "50%" }}>
          <canvas id="bubbleChart"></canvas>
        </div>
        <div style={{ width: "50%", height: "50%" }}>
          <canvas id="topicsChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Hfhfh;
