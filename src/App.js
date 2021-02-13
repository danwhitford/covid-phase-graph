import logo from "./logo.svg";
import Chart from "chart.js";
import { useEffect } from "react";
import chroma from 'chroma-js'

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getData(size) {
  const a = new Array(size).fill().map((e, i) => {
    return {
      x: getRandomArbitrary(i - 2, i + 2),
      y: getRandomArbitrary(i - 2, i + 2),
    };
  })
  return [...a, ...a.reverse().map(e => {return {x: e.x-5, y: e.y+5}})]
}


function App() {
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    const scatterChart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter Dataset",
            data: getData(50),
          
            backgroundColor: (context) => {
              return chroma
                .scale(['#fafa6e','#2A4858'])                
                .colors(context.dataset.data.length)[context.dataIndex]
            },
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
            },
          ],
        },
      },
    });
  });

  return (
    <div className="App">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default App;
