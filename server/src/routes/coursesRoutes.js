import express from "express";
import {
  getCoursesByQuery,
  getCourseById,
} from "../controllers/coursesController.js";

const router = express.Router();

router.get("/", getCoursesByQuery);
router.get("/:courseId", getCourseById);

export default router;
