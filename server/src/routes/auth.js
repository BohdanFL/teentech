import express from "express";
import {
  getProtected,
  refreshToken,
  login,
  signup,
  logout,
} from "../controllers/auth.js";
import authenthicate from "../middleware/authenthicate.js";

const router = express.Router();

router.post("/api/login", login);
router.post("/api/signup", signup);
router.post("/api/logout", logout);
router.get("/api/refresh-token", refreshToken);
router.get("/api/protected", authenthicate, getProtected);

export default router;
