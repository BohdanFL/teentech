import { useAuth } from "@/context/AuthContext";
import React from "react";
import {
    Flex,
    Box,
    Link as ChakraLink,
    AvatarFallback,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router";
import { Avatar } from "@/components/ui/avatar";

const Auth = () => {
    const { pathname } = useLocation();
    const { user } = useAuth();
    return (
        <Stack
            display="flex"
            alignItems="center"
            position="absolute"
            top="50px"
            left="50px">
            <Avatar
                src={user && user.avatar_url}
                mb={0}
                colorPalette="teal"
                variant="solid"
                size="lg">
                <AvatarFallback />
            </Avatar>

            <ChakraLink color="teal.500" asChild>
                {pathname === "/user-profile" ? (
                    <Link to={-1}>Go Back</Link>
                ) : (
                    <Link to="/user-profile">User Profile</Link>
                )}
            </ChakraLink>
        </Stack>
    );
};

export default Auth;
