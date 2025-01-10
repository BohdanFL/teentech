import express from "express";
import { displayCourses } from "../controllers/paginationController.js";

const router = express.Router();

router.get("/", displayCourses);

export default router;
