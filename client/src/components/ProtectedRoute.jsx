import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (user === undefined) return <div>Loading...</div>;
    if (user === null) return <div>Permission Denied!</div>;

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
