import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Box, Button, Heading, Text, Link, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    console.log(user);
    // Fetching user data with useQuery.
    // const fetchUser = async () => {
    //     const response = await api.get("/protected");
    //     if (!response.ok && !response.data.user) {
    //         return new Error("Network response was not ok");
    //     }
    //     console.log(response.data);
    //     return response.data.user.user_metadata;
    // };

    // const { isPending, data, error } = useQuery({
    //     queryKey: ["user"],
    //     queryFn: fetchUser,
    // });

    // if (isPending) return "Loading...";
    // if (error) return "An error has occured: " + error.message;

    return (
        <Box>
            <Heading>UserProfile</Heading>
            <Text>Username: {user.username ? user.username : "None"}</Text>
            <Text>Email: {user.email}</Text>
            <HStack gap="4">
            <Link as={RouterLink} to={-1}>
                <Button>
                Back
                </Button>
            </Link>
            
            <Button
                onClick={async () => {
                    await logout();
                    navigate("/");
                }}>
                Logout
            </Button>
            </HStack>
        </Box>
    );
};

export default UserProfile;
