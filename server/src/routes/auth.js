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

router.patch("/auth/update-password", updatePassword);

router.get("/auth/confirm", confirmResettingPassword);

router.get("/refresh-token", refreshToken);

router.get("/protected", authenthicate, getProtected);

router.get("/auth/google", signInWithGoogle);

router.get("/auth/google/callback", signInWithGoogleCallback);

export default router;
