import express from "express";
import { searchCourses } from "../controllers/coursesController.js";

const router = express.Router();

router.get("/search", searchCourses);

export default router;
