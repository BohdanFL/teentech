import { Flex } from "@chakra-ui/react";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import { Routes, Route } from "react-router";
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
                <Route path="signup" element={<Register />} />
            </Routes>
        </Flex>
    );
}

export default App;
