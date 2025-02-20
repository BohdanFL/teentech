import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const navigate = useNavigate();
    const { accessToken, isAuthenticated, logout } = useAuth();

    // Чекаємо, поки завантаження автентифікації завершиться
    useEffect(() => {
        if (isAuthenticated && !accessToken) {
            navigate("/");
        }
    }, [accessToken, isAuthenticated, navigate]);

    const fetchUser = async () => {
        const response = await api.get("/api/protected", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log(response.data);
        return response.data.user.user_metadata;
    };

    const {
        isPending,
        data: user,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!accessToken,
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occured: " + error.message;

    return (
        <Box>
            <Heading>UserProfile</Heading>
            <Text>Username {user.username}</Text>
            <Text>Email {user.email}</Text>
            <Button
                onClick={() => {
                    logout();
                    navigate("/");
                }}>
                Logout
            </Button>
        </Box>
    );
};

export default UserProfile;
