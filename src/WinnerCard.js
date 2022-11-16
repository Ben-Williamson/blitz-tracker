import { Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";

function WinnerCard({ gameData }) {
  const [scoreDiff, setScoreDiff] = useState(0);
  const [winner, setWinner] = useState("");

  const calcTotals = (gameData) => {
    gameData = JSON.parse(JSON.stringify(gameData));
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
      let totalScores = calcTotals(gameData);

      let highScore = 0;
      let win = "";
      Object.keys(totalScores).forEach((key) => {
        if(totalScores[key] > highScore) {
            highScore = totalScores[key]
            win = key
        }
      });
      setWinner(win)
      let sortedScores = Object.values(totalScores).sort().reverse();

      setScoreDiff(sortedScores[0] - sortedScores[1]);
    }
  }, [gameData]);

  return (
    <Stack align="center" style={{height: "100%", justifyContent: "center"}}>
      <Title order={4} ta="center">Current Winner</Title>
      <Title order={1}>{winner}</Title>
      <Title order={4} ta="center">
        {scoreDiff} points ahead.
      </Title>
    </Stack>
  );
}

export default WinnerCard;
