import express from "express";
import { PORT } from "./config/config.js";
import coursesRoute from "./routes/coursesRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/courses", coursesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
