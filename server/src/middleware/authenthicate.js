import supabase from "../config/supabaseClient.js";

export default async (req, res, next) => {
  // Очікуємо, що access_token передається у заголовку Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  if (!authHeader) return res.status(401).json({ error: "Not authenticated" });

  let token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (!data.user || error) {
    return res.status(401).json({ error: "Not authenticated access" });
  }

  req.user = data.user.user_metadata;
  next();
};
