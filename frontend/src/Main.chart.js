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

import { Slider } from "@mantine/core";

import { std, mean, random } from "mathjs";

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

const borderColors = ["rgb(252, 207, 3)", "rgb(252, 119, 3)"];
// const lineColors = ["rgb(252, 207, 3)", "rgba(54, 162, 235, 0.5)"];

const accumulate = (arr) =>
  arr.map(
    (
      (sum) => (value) =>
        (sum += value)
    )(0)
  );

function createListOfNNumbersBetweenAAndB(n, a, b) {
  const listOfN = Array(...new Array(n));
  return listOfN.map(() => Math.random() * (b - a) + a);
}

function computeMeanSdAndItervalRangeMinMax(list) {
  const sum = list.reduce((a, b) => a + b, 0);
  const mean = sum / list.length;
  const sumMinusMean = list.reduce((a, b) => a + (b - mean) * (b - mean), 0);

  return {
    mean: mean,
    sd: Math.sqrt(sumMinusMean / (list.length - 1)),
    range: [Math.min(...list), Math.max(...list)],
  };
}

function transfomListToExactMeanAndSd(list, mean, sd) {
  const current = computeMeanSdAndItervalRangeMinMax(list);
  return list.map((n) => (sd * (n - current.mean)) / current.sd + mean);
}

function MainChart({ gameData, extraPoints, randomness }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (Object.keys(gameData).length > 0) {
      let labels = [
        ...gameData.games.map((g) => {
          return g.date;
        }),
        ...Array(extraPoints).fill(" "),
      ];

      setChartData({
        labels,
        datasets: Object.keys(gameData.games[0].scores).map((player, key) => {
          let data = gameData.games.map((game) => {
            return game.scores[player];
          });
          var list = createListOfNNumbersBetweenAAndB(extraPoints, 1, 10);
          return {
            label: player,
            data: accumulate([
              ...data,
              ...transfomListToExactMeanAndSd(
                list,
                mean(data),
                std(data) * randomness
              ),
            ]),
            borderColor: borderColors[key],
            backgroundColor: borderColors[key],
          };
        }),
      });
    }
  }, [gameData, extraPoints, randomness]);

  return (
    <>
      {chartData && <Line options={options} data={chartData} />}
    </>
  );
}

export default MainChart;
