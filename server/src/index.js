import express from "express";
import { PORT } from "./config/config.js";
import coursesRoute from "./routes/coursesRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/courses", coursesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO:
// - Connect Supabase - done
// - Fill table courses with data - done
// - Decide with requests and urls - done
// - Create models for courses
