import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import swaggerSetup from "./docs/swagger.js";
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Замініть на ваш клієнтський домен
    credentials: true,
  })
);

app.use("/api-docs", swaggerSetup);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
