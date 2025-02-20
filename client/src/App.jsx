import {
    Flex,
    Box,
    Link as ChakraLink,
    AvatarFallback,
    Stack,
} from "@chakra-ui/react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route, Link, useLocation } from "react-router";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import { useAuth } from "./context/AuthContext";
import { Avatar } from "./components/ui/avatar";

function App() {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center">
            <Stack
                display="flex"
                alignItems="center"
                position="absolute"
                top="50px"
                left="50px">
                <Avatar mb={0} colorPalette="teal" variant="solid" size="lg">
                    <AvatarFallback />
                </Avatar>

                <ChakraLink color="teal.500" asChild>
                    {isAuthenticated && pathname === "/user-profile" ? (
                        <Link to="/">Back To Login</Link>
                    ) : (
                        <Link to="/user-profile">User Profile</Link>
                    )}
                </ChakraLink>
            </Stack>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </Flex>
    );
}

export default App;
