import express from "express";
import { PORT } from "./config/config.js";
import coursesRoute from "./routes/coursesRoutes.js";
import displayCourses from "./routes/paginationRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/courses", coursesRoute);
app.use("/api/displayCourses", displayCourses);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
