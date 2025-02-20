import express from "express";
import authentication from "./routes/authenticationRoute.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api", authentication);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
