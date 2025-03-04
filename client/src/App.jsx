import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router";
import UserProfile from "./pages/UserProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import Auth from "./pages/Auth";
import { Flex } from "@chakra-ui/react";

function App() {
    return (
        <>
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                backgroundColor="gray.200"
                justifyContent="center"
                alignItems="center">
                <Auth />
                <Toaster />
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/update-password"
                        element={<UpdatePassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/user-profile" element={<UserProfile />} />
                    </Route>
                </Routes>
            </Flex>
        </>
    );
}

export default App;
