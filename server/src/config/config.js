import "dotenv/config";

const config = {
  databaseUrl: process.env.SUPABASE_URL,
  apiKey: process.env.SUPABASE_KEY,
  port: process.env.PORT || 5000,
};

export default config;
