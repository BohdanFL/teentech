import express from "express";
import {
  getProtected,
  refreshToken,
  login,
  signup,
  logout,
  signInWithGoogle,
  signInWithGoogleCallback,
  resetPassword,
  updatePassword,
  confirmResettingPassword,
} from "../controllers/auth.js";
import authenthicate from "../middleware/authenthicate.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/reset-password", resetPassword);

router.patch("/update-password", updatePassword);

router.get("/confirm-reset", confirmResettingPassword);

router.get("/refresh-token", refreshToken);

router.get("/protected", authenthicate, getProtected);

router.get("/google", signInWithGoogle);

router.get("/google/callback", signInWithGoogleCallback);

export default router;
