const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello this is book management app");
})

app.listen(3000, () => console.log(`app is running at http://localhost:3000`))