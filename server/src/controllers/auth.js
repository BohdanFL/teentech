import supabase from "../config/supabaseClient.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { access_token, refresh_token } = data.session;

  // Встановлюємо refresh_token в httpOnly cookie
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 1000, // 7 днів
  });

  res.json({ accessToken: access_token, expiresIn: data.session.expires_in });
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
      emailRedirectTo: "http://localhost:5173",
    },
  });
  if (error) {
    console.error(error);
    return res.status(400).json({ error });
  }

  console.log(data);
  res.json({
    message: "Sign Up Successfull",
    user: data.user,
    accessToken: data.session.access_token,
    expiresIn: data.session.expires_in,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("refresh_token");
  res.json({ message: "Logout successful" });
};

export const getProtected = (req, res, next) => {
  res.json({
    message: "This is protected route",
    user: req.user,
    accessToken: req.headers.authorization.split(" ")[1],
  });
};

export const refreshToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  console.log("Refreshing token");
  if (!refresh_token) return res.status(401).json({ message: "Unauthorized" });

  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) return res.status(403).json({ message: "Invalid refresh token" });

  res.json({
    accessToken: data.session.access_token,
    expiresIn: data.session.expires_in,
  });
};
