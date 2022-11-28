const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
const port = 3001;

const dataPath = "./data/data.json";

app.use(express.json());
app.use(cors());

app.get("/data", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    res.send(data);
  });
});

app.post("/addGame", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.games.push(req.body);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.send(data);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
