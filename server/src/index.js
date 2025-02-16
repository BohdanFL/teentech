import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
