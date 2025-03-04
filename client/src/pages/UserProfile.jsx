import { useAuth } from "@/context/AuthContext";
import {
    Avatar,
    Box,
    Button,
    Heading,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    // Fetching user data with useQuery.
    // const fetchUser = async () => {
    //     const response = await api.get("/auth/protected");
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
            <HStack>
                {user.avatar_url && (
                    <Avatar.Root>
                        <Avatar.Fallback name={user.username} />
                        <Avatar.Image src={user.avatar_url} />
                    </Avatar.Root>
                )}
                <Heading>UserProfile</Heading>
            </HStack>

            <Text>
                Username: {user.username ? user.username : user.full_name}
            </Text>
            <Text>Email: {user.email}</Text>
            <Button
                onClick={async () => {
                    await logout();
                }}>
                Logout
            </Button>
        </Box>
    );
};

export default UserProfile;
