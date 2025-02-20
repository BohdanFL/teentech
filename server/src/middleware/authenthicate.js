import supabase from "../config/supabaseClient.js";

// export default async (req, res, next) => {
// console.log(req.cookies);
// const token = req.cookies.auth_token;

// if (!token) {
//   return res.status(401).json({ error: "Not authenticated access" });
// }

// const { data, error } = await supabase.auth.getUser(token);

// if (!data.user || error) {
//   return res.status(401).json({ error: "Not authenticated access" });
// }
// const request = {
//   header: "Application",
//   httpMethod: "GET",
//   user: data.user,
// };
// console.log(req.user);
// req.user = { username: "bohdan", email: "bohdan.rb.dev@gmail.com" };
// next();
// };

export default async (req, res, next) => {
  // Очікуємо, що access_token передається у заголовку Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  if (!authHeader) return res.status(401).json({ error: "Not authenticated" });

  let token = authHeader.split(" ")[1];

  // Спроба отримати користувача через Supabase
  let { data, error } = await supabase.auth.getUser(token);
  console.log(error);
  // Якщо помилка і, ймовірно, токен прострочено, спробуємо оновити його
  if (error && error.message.toLowerCase().includes("expired")) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken)
      return res.status(401).json({ error: "Refresh token missing" });

    // Оновлюємо сесію за допомогою refresh_token
    const { data: refreshData, error: refreshError } =
      await supabase.auth.refreshSession({ refresh_token: refreshToken });
    if (refreshError)
      return res.status(401).json({ error: "Failed to refresh token" });

    const newAccessToken = refreshData.session.access_token;
    const newRefreshToken = refreshData.session.refresh_token;

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 днів
    });

    req.headers.authorization = `Bearer ${newAccessToken}`;
    token = newAccessToken;

    res.set("x-access-token", newAccessToken);

    ({ data, error } = await supabase.auth.getUser(token));
    if (error)
      return res.status(401).json({ error: "Not authenticated after refresh" });
  }

  req.user = data.user;
  next();
};
