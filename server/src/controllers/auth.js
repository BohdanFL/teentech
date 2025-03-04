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

  res.json({
    access_token,
    expiresIn: data.session.expires_in,
    user: data.user.user_metadata,
  });
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
    user: data.user.user_metadata,
    // access_token: data.session.access_token,
    // expiresIn: data.session.expires_in,
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
  });
};

export const refreshToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  console.log("Refreshing token");
  if (!refresh_token) return res.status(401).json({ message: "Unauthorized" });

  const { data, error } = await supabase.auth.refreshSession({ refresh_token });

  if (error) return res.status(403).json({ message: "Invalid refresh token" });

  res.json({
    access_token: data.session.access_token,
    user: data.user.user_metadata,
    expiresIn: data.session.expires_in,
  });
};

export const signInWithGoogle = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/google/callback",
      queryParams: {
        // access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
  console.log("Redirect To: ", data.url);

  res.redirect(data.url);
};

export const signInWithGoogleCallback = async (req, res) => {
  console.log("Redirecting from Google Auth is successful");
  const code = req.query.code;

  if (code) {
    const {
      data: { session },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.log(error);
      return res.status(400).json({ message: "Sign In With Google Failed" });
    }

    // Встановлюємо refresh_token в httpOnly cookie
    res.cookie("refresh_token", session.refresh_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 днів
    });

    // res.json({
    //   access_token: session.access_token,
    //   expiresIn: session.expires_in,
    // });
    console.log(session);
  }

  res.redirect("http://localhost:5173/pantry"); ///змінено перенаправлення із сторінки користувача на коморку
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "No email provided." });
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/update-password",
  });

  if (error) throw error;

  return res
    .status(200)
    .json({ message: "Password recovery email has been sent." });
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  // const code = req.query.code;

  if (!newPassword) {
    return res.status(400).json({ message: "New password are required." });
  }

  // if (!code) {
  //   return res
  //     .status(400)
  //     .json({ message: "Reset Password Failed. Code for exchange not exist" });
  // }

  // const {
  //   data: { session },
  //   error: exchangeError,
  // } = await supabase.auth.exchangeCodeForSession(code);

  // if (exchangeError) {
  //   return res
  //     .status(400)
  //     .json({ message: "Reset Password Failed. Cannot retrieve session." });
  // }

  const { data, error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.error("Reset password error:", error);
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Password updated successfully." });
};

export const confirmResettingPassword = async (req, res) => {
  const token_hash = req.query.token_hash;
  const type = req.query.type;
  const next = req.query.next ?? "/";
  console.log(token_hash, type, next);
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return res.redirect(303, `http://localhost:5173/${next.slice(1)}`);
    }
  }

  // return the user to an error page with some instructions
  res.redirect(303, "/auth/auth-code-error");
};
