import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Overall Score",
    },
  },
};

const borderColors = ["rgb(252, 207, 3)", "rgb(252, 119, 3)"]
// const lineColors = ["rgb(252, 207, 3)", "rgba(54, 162, 235, 0.5)"];

const accumulate = arr => arr.map((sum => value => sum += value)(0));

function MainChart({ gameData }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (Object.keys(gameData).length > 0) {
      let labels = gameData.games.map((g) => {
        return g.date;
      });

      setChartData({
        labels,
        datasets: Object.keys(gameData.games[0].scores).map((player, key) => {
          return {
            label: player,
            data: accumulate(gameData.games.map((game) => {
              return game.scores[player];
            })),
            borderColor: borderColors[key],
            backgroundColor: borderColors[key],
          };
        }),
      });
    }
  }, [gameData]);

  return <>{chartData && <Line options={options} data={chartData} />}</>;
}

export default MainChart;
