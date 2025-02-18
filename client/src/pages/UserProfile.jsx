import api from "@/api/api";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const navigate = useNavigate();
    const fetchUser = async () => {
        const response = await api.get("/api/protected");
        console.log(response.data);
        return response.data.user.user_metadata;
    };

    const logout = async () => {
        const response = await api.post("/api/logout");
        console.log(response);
        navigate("/");
    };

    const { isPending, data, error } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    if (isPending) return "Loading...";
    if (error) return "An error has occured: " + error.message;

    return (
        <Box>
            <Heading>UserProfile</Heading>
            <Text>Username {data.username}</Text>
            <Text>Email {data.email}</Text>
            <Button onClick={logout}></Button>
        </Box>
    );
};

export default UserProfile;
