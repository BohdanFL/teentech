import supabase from "../config/supabaseClient.js"

export default async (req, res, next) => {
    const {data, error} = await supabase.auth.getUser(req.cookies.accessToken);    

    console.log(data);

    if (error) {
        console.error("Error token verification:", error.message);
    }

    req.user = data.user;  

    next();
}