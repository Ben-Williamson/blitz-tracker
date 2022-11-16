import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const borderColors = ["rgb(252, 207, 3)", "rgb(252, 119, 3)"]

ChartJS.register(ArcElement, Tooltip, Legend);

function OverallChart({ gameData }) {
  const [chartData, setChartData] = useState();

  const calcTotals = (gameData) => {
    gameData = JSON.parse(JSON.stringify(gameData))
    return gameData.games
      .map((game) => {
        return game.scores;
      })
      .reduce((acc, game) => {
        Object.keys(acc).forEach((element) => {
          acc[element] += game[element];
        });
        return acc;
      });
  };

  useEffect(() => {
    if (Object.keys(gameData).length > 0) {
      let totalScores = calcTotals(gameData)

      setChartData({
        labels: Object.keys(totalScores),
        datasets: [
          {
            label: "Number of Wins",
            data: Object.values(totalScores),
            backgroundColor: borderColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [gameData]);

  return <>{chartData && <Doughnut data={chartData} />}</>;
}

export default OverallChart;
