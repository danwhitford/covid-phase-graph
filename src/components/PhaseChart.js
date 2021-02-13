import Chart from "chart.js";
import { useEffect, useState } from "react";
import chroma from "chroma-js";
import { getData } from "../repos/ukdash";

async function shapeData(axesDims) {
  const raw = await getData(axesDims.x.value, axesDims.y.value);

  return raw.data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((row) => {
      return {
        x: row.newAdmissions,
        y: row.covidOccupiedMVBeds,
        date: row.date,
      };
    });
}

function PhaseChart({axesDims}) {
  const [chartData, setChartData] = useState([]);
  const [scatterChart, setScatterChart] = useState(undefined);

  useEffect(() => {
    shapeData(axesDims).then((res) => setChartData(res));
  }, [axesDims]);

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    const scatterChart = new Chart(ctx, {
      type: "scatter",
      // data: {
      //   datasets: [
      //     {            
      //       data: chartData,
      //       backgroundColor: (context) => {
      //         return chroma
      //           .scale(["#fafa6e", "#2A4858"])
      //           .colors(context.dataset.data.length)[context.dataIndex];
      //       },
      //     },
      //   ],
      // },
      options: {
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
              scaleLabel: {
                display: true,
                labelString: axesDims.x.label,
              }
            },
          ],
          yAxes: [
            {
              type: "linear",
              position: "left",
              scaleLabel: {
                display: true,
                labelString: axesDims.y.label,
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (item, data) => {
              const itemData =
                data.datasets[item.datasetIndex].data[item.index];
              return [itemData.date, `(${itemData.x}, ${itemData.y})`];
            },
          },
        },
        legend: {
          display: false
        }
      },
    });
    setScatterChart(scatterChart);
  }, []);

  useEffect(() => {
    if (!scatterChart) {
      return;
    }

    scatterChart.data = {
      datasets: [
        {
          data: chartData,
          backgroundColor: (context) => {
            return chroma
              .scale(["#fafa6e", "#2A4858"])
              .colors(context.dataset.data.length)[context.dataIndex];
          },
        },
      ],
    };
    scatterChart.update();
  }, [chartData, scatterChart]);

  return (
    <div className="chart-container" style={{ width: "60%" }}>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default PhaseChart;
