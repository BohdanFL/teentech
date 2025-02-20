import supabase from "../config/supabaseClient.js";

export const signUp = async (email, password, username) => {
    try {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: "http://localhost:5173/",
                username: username,
            }
        });

        if (signUpError) {
            throw signUpError;
        }

        console.log(signUpData);

        return signUpData;
    } catch (error) {
        console.error("Error occurred during registration:", error.message);
        return null;
    }
};

export const signIn = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Sign-in error:", error.message);
            return { error: error.message };
        }

        console.log("User signed in successfully:", data);
        return data.session;
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return { error: "An unexpected error occurred." };
    }
};

export const logOut = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({message: "Logged out and cookie cleared."})
}

export const refreshTokenMethod = async (refresh_token) => {
    const {data, error} = await supabase.auth.refreshSession({refresh_token});

    if (error) throw error;
    
    return data;
}