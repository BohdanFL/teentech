import { SUPABASE_KEY, SUPABASE_URL } from "./config.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

if (!SUPABASE_KEY || !SUPABASE_URL) {
    console.log(`No supabase key or supabase url provided.`)
}
export default supabase;