import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import api from "@/api/api.js"; // API з axios
import { useNavigate, useSearchParams } from "react-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const refresh = async () => {
            try {
                const response = await api.get("/api/refresh-token");
                setAccessToken(response.data.accessToken);
            } catch (error) {
                setAccessToken(null);
            } finally {
                setIsAuthenticated(true); // Завершили перевірку автентифікації
            }
        };
        if (isAuthenticated) {
            refresh();
        }
    }, []);
    console.log("AuthProvider Rendered: ", accessToken);

    // Функція логіну
    const login = async (email, password) => {
        try {
            const response = await api.post("/api/login", { email, password });
            console.log("Login: ", response.data);
            setAccessToken(response.data.accessToken);
            setIsAuthenticated(true);
            scheduleTokenRefresh(response.data.expiresIn);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    // Функція реєстрації
    const signup = async (email, password) => {
        try {
            const response = await api.post("/api/signup", { email, password });
            console.log("Signup: ", response.data);
            // Зробити перевірку на accessToken і на expiresIn
            setAccessToken(response.data.accessToken);
            setIsAuthenticated(true);
            scheduleTokenRefresh(response.data.expiresIn);
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    // Функція виходу
    const logout = async () => {
        try {
            await api.post("/api/logout");
        } catch (error) {
            console.error("Logout failed", error);
        }
        setAccessToken(null);
        setIsAuthenticated(false);
    };

    // Функція скидання паролю
    const resetPassword = async (email) => {
        try {
            console.log(email);
            const response = await api.post("/api/reset-password", { email });
            console.log("Reset Password Response: ", response);
        } catch (error) {
            console.error("Reset Password failed", error);
        }
    };

    // Функція зміни паролю
    const updatePassword = async (newPassword, access_token, refresh_token) => {
        try {
            const response = await api.patch("/api/update-password", {
                newPassword,
                access_token,
                refresh_token,
            });
            console.log("Update Password Response: ", response);
            console.log("Update Password Data: ", response.data);

            // setAccessToken(response.data.accessToken);
            // setIsAuthenticated(true);
            // scheduleTokenRefresh(response.data.expiresIn);
        } catch (error) {
            console.error("Update Password failed", error);
        }
    };

    // Функція оновлення токена
    const refreshToken = useCallback(async () => {
        try {
            const response = await api.get("/api/refresh-token");
            console.log("Refresh Token: ", response);

            setAccessToken(response.data.accessToken);
            scheduleTokenRefresh(response.data.expiresIn);
            return response.data.accessToken;
        } catch (error) {
            console.error("Token refresh failed", error);
            logout();
        }
    }, []);

    // Оновлення токена перед його закінченням (expiresIn - в секундах)
    const scheduleTokenRefresh = (expiresIn) => {
        console.log();
        const refreshTime = expiresIn * 1000 - 60 * 1000; // Оновлюємо за 1 хвилину до закінчення
        setTimeout(refreshToken, refreshTime);
    };

    // Оновлюємо токен після завантаження сторінки
    useEffect(() => {
        if (isAuthenticated) {
            refreshToken();
        }
    }, [refreshToken]);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isAuthenticated,
                setAccessToken,
                login,
                signup,
                logout,
                resetPassword,
                updatePassword,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
