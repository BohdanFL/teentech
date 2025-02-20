import express from "express";
import { signUp, signIn, logOut, refreshTokenMethod } from "../controllers/authenticationController.js";
import cookieParser from "cookie-parser";
import authenticateMIddleware from "../middleware/authenticateMIddleware.js";
import supabase from "../config/supabaseClient.js";

const router = express.Router();
router.use(cookieParser());

router.post("/signup", async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "No email, username, or password provided." });
    }

    try {
        const signUpSuccess = await signUp(email, password, username);
        if (!signUpSuccess) {
            return res.status(500).json({ message: "Error signing up user." });
        }
        return res.status(200).json({ data: signUpSuccess });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "No email or password provided."});
    }

    try {
        const signInSuccess = await signIn(email, password);

        res.cookie("refreshToken", signInSuccess.refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 7 * 1000,
        })

        res.cookie("accessToken", signInSuccess.access_token, {
            httpOnly: true,
            maxAge: 6 * 6 * 1000 * 100,
        })

        return res.status(200).json({data: signInSuccess, message: "cookie has been sent."})
    } catch (error) {
        return res.status(500).json({error})
    }
})

router.get("/protected", authenticateMIddleware, (req, res) => {
    res.json({user: req.user})
})

router.post("/logOut", logOut);

router.post("/refresh-token", async (req, res) => {
    if (!req.cookies.refreshToken) {
        console.error("No refreshToken stored in cookies provided.")
    }
    
    const refresh_token = req.cookies.refreshToken;


    console.log(refresh_token)

    if (!refresh_token) {
        return res.status(400).json({message: "No refresh token provided."})
    }

    const refreshedSession = await refreshTokenMethod(refresh_token);

    res.json({
        access_token: refreshedSession.session.access_token,
        refresh_toke: refreshedSession.session.refresh_token,
        expires_in: refreshedSession.session.expires_in,
    })

});    

export default router;
