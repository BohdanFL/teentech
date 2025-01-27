import express from "express";
import { PORT } from "./config/config.js";
import coursesRoute from "./routes/coursesRoutes.js";
import displayCourses from "./routes/paginationRoutes.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

for (let index = 0; index < course; index++) {
  const uri = course[index].uri
  app.use(uri, coursesRoute);
}

app.use("/api/displayCourses", displayCourses);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
