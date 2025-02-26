import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    // headers: {
    //     "Access-Control-Allow-Origin":
    //         "https://rvxalcrebfafwppszgeg.supabase.co",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //     "Access-Control-Allow-Credentials": "true",
    // },
});
