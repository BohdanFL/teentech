import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router";
import UserProfile from "./pages/UserProfile";
import UpdatePassword from "./pages/UpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Pantry from "./pages/Pantry";
import ITCompany from "./pages/ITCompany";
import VSCode from "./pages/VSCode";
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
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/update-password"
                        element={<UpdatePassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/pantry" element={<Pantry />} />
                        <Route path="/it-company" element={<ITCompany />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/vscode" element={<VSCode />} />
                    </Route>
                </Routes>
            </Flex>
        </>
    );
}

export default App;
