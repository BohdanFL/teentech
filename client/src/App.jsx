import { Flex } from "@chakra-ui/react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center">
            <Routes>
                <Route index element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-profile" element={<UserProfile />} />
            </Routes>
        </Flex>
    );
}

export default App;
