import {
  Table,
  Group,
  Stack,
  Grid,
  Card,
  AppShell,
  Title,
  Center,
} from "@mantine/core";

import MainChart from "./Main.chart";
import OverallChart from "./Overall.chart";
import WinnerCard from "./WinnerCard";

import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

function ResultsTable({ gameData }) {
  const rows = gameData?.games?.map((game, key) => (
    <tr key={key}>
      <td>{game.date}</td>
      <td>{game.scores.Ben}</td>
      <td>{game.scores.Abi}</td>
    </tr>
  ));

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Ben</th>
          <th>Abi</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default function App() {
  const [gameData, setGameData] = useState({});
  const isBigScreen = useMediaQuery({ query: "(min-width: 1224px)" });

  useEffect(() => {
    var getData = async () => {
      var data = await fetch("http://localhost:3000/data.json");
      data = await data.json();
      setGameData(data);
    };
    getData();
  }, []);

  return (
    <AppShell>
      <Stack>
        {isBigScreen && (
          <Grid>
            <Grid.Col span={3}>
              <Stack>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <OverallChart gameData={gameData} />
                </Card>
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <WinnerCard gameData={gameData} />
                </Card>
              </Stack>
            </Grid.Col>
            <Grid.Col span="auto">
              <Card
                style={{ height: "100%" }}
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
              >
                <MainChart gameData={gameData} />
              </Card>
            </Grid.Col>
          </Grid>
        )}

        {!isBigScreen && (
          <Stack>
            <Group position="apart" grow align={"stretch"}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <OverallChart gameData={gameData} />
              </Card>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <WinnerCard gameData={gameData} />
              </Card>
            </Group>
            <Card
              style={{ height: "50vh" }}
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
            >
              <MainChart gameData={gameData} />
            </Card>
          </Stack>
        )}
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <ResultsTable gameData={gameData} />
        </Card>
      </Stack>
    </AppShell>
  );
}
