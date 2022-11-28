import {
  Table,
  Group,
  Stack,
  Grid,
  Card,
  AppShell,
  Title,
  Space,
  Text,
  Slider,
  Box,
  TextInput,
  Checkbox,
  Button,
  PasswordInput,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
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

function AddGame({ players, setGameData }) {
  const form = useForm({
    initialValues: {
      date: "",
      password: "",
    },

    validate: {
      password: (value) => (value === "Blitz123" ? null : "Incorrect Password"),
    },
  });

  return (
    <Box mx="auto">
      {players && (
        <form
          onSubmit={form.onSubmit((values) => {
            let reqBody = {};
            reqBody["date"] = values.date;
            reqBody["scores"] = {};
            for (let player of players) {
              reqBody["scores"][player] = values[player] ? values[player] : 0;
            }
            let sendData = async (data) => {
              const rawResponse = await fetch("https://api.blitz.benwill.dev/addGame", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              const content = await rawResponse.json();
              setGameData(content);
            };
            sendData(reqBody);
          })}
        >
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Blitz game"
            {...form.getInputProps("date")}
          />

          {players.map((name, key) => {
            return (
              <NumberInput
                key={key}
                withAsterisk
                label={`${name}'s Score`}
                placeholder="0"
                {...form.getInputProps(name)}
              />
            );
          })}

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <Group position="center" mt="md">
            <Button type="submit">Add Game</Button>
          </Group>
        </form>
      )}
    </Box>
  );
}

export default function App() {
  const [gameData, setGameData] = useState({});
  const [extraPoints, setExtraPoints] = useState(0);
  const [randomness, setRandomness] = useState(1);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1224px)" });

  useEffect(() => {
    var getData = async () => {
      var data = await fetch("https://api.blitz.benwill.dev/data");
      data = await data.json();
      setGameData(data);
    };
    getData();
  }, []);

  return (
    <AppShell>
      <Stack>
        {/* {[extraPoints, randomness]} */}
        {/* {JSON.stringify(gameData)} */}

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
                <Card shadow="sm" p="lg" radius="md" withBorder>
                  <Stack style={{ height: "100%", justifyContent: "center" }}>
                    <Title order={4} ta="center">
                      Predict the Future!
                    </Title>
                    <Space></Space>
                    <Text>Number of Games</Text>
                    <Slider value={extraPoints} onChange={setExtraPoints} />
                    <Text>Randomness</Text>
                    <Slider
                      max={5}
                      value={randomness}
                      onChange={setRandomness}
                    />
                  </Stack>
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
                <MainChart
                  gameData={gameData}
                  extraPoints={extraPoints}
                  randomness={randomness}
                />
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
              <MainChart
                gameData={gameData}
                randomness={randomness}
                extraPoints={extraPoints}
              />
            </Card>
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Stack style={{ height: "100%", justifyContent: "center" }}>
                <Title order={4} ta="center">
                  Predict the Future!
                </Title>
                <Space></Space>
                <Text>Number of Games</Text>
                <Slider value={extraPoints} onChange={setExtraPoints} />
                <Text>Randomness</Text>
                <Slider max={5} value={randomness} onChange={setRandomness} />
              </Stack>
            </Card>
          </Stack>
        )}
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <ResultsTable gameData={gameData} />
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <AddGame players={gameData.players} setGameData={setGameData} />
        </Card>
      </Stack>
    </AppShell>
  );
}
