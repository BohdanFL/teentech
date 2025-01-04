import express from "express";
import config from "./config/config.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
