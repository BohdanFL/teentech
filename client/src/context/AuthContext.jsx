import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
} from "react";
import api from "@/api/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [accessToken, setAccessToken] = useState();
    // Отримуємо токен при завантаженні сторінки
    useEffect(() => {
        const refresh = async () => {
            try {
                // TODO: Тут можна змінити на отримання користувача замість просто рефрешу токена
                const response = await api.get("/refresh-token");
                setAccessToken(response.data.access_token);
                setUser(response.data.user);
                console.log("Refreshing token...");
            } catch (error) {
                console.error(error);
                setAccessToken(null);
                setUser(null);
            } finally {
                console.log("Token is refreshed");
            }
        };

        refresh();
    }, []);

    // Налаштовуємо перехоплення запитів на сервер і додаємо до заголовків токен
    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization =
                !config._retry && accessToken
                    ? `Bearer ${accessToken}`
                    : config.headers.Authorization;
            return config;
        });

        return () => {
            api.interceptors.request.eject(authInterceptor);
        };
    }, [accessToken]);

    // Налаштовуємо перехоплення відповідей зі сервера
    // При помилці про неавторизованість намагаємось отримати новий токен
    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (
                    error.response.status === 403 &&
                    error.response.data.message === "Unauthorized"
                ) {
                    try {
                        const response = await api.get("/refresh-token");

                        setAccessToken(response.data.access_token);

                        originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
                        originalRequest._retry = false;

                        return api(originalRequest);
                    } catch (error) {
                        setAccessToken(null);
                    }
                }

                return Promise.reject(error);
            }
        );
        return () => {
            api.interceptors.response.eject(refreshInterceptor);
        };
    }, []);

    // Функція логіну
    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });

            setAccessToken(response.data.access_token);
            setUser(response.data.user);
        } catch (error) {
            setAccessToken(null);
            setUser(null);
            console.error("Login failed", error);
        }
    };

    // Функція реєстрації
    const signup = async (email, password, username) => {
        try {
            const response = await api.post("/signup", {
                email,
                password,
                username,
            });

            setUser(response.data.user);
        } catch (error) {
            setUser(null);
            console.error("Signup failed", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            window.location.href = "http://localhost:3000/auth/google";
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    // Функція виходу
    const logout = async () => {
        try {
            await api.post("/logout");
            console.log("Logout successfull");
        } catch (error) {
            console.error("Logout failed", error);
        }
        setAccessToken(null);
        setUser(null);
    };

    // Функція скидання паролю
    const resetPassword = async (email) => {
        try {
            console.log(email);
            const response = await api.post("/reset-password", { email });
            console.log("Reset Password Response: ", response);
        } catch (error) {
            console.error("Reset Password failed", error);
        }
    };

    // Функція зміни паролю
    const updatePassword = async (newPassword) => {
        try {
            const response = await api.patch(`/auth/update-password`, {
                newPassword,
            });
            console.log("Update Password Data: ", response.data);
        } catch (error) {
            console.error("Update Password failed", error);
            throw new Error("Update Password failed");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                login,
                signup,
                logout,
                resetPassword,
                updatePassword,
                signInWithGoogle,
                user,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used inside of a AuthProvier");
    }

    return context;
};
