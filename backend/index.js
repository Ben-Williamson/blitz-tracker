const express = require("express");
const fs = require("fs");
var cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.get("/data", (req, res) => {
  fs.readFile("data.json", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
