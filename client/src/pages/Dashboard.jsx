import React from "react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
    const { accessToken, isAuthenticated, login, logout } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            {isAuthenticated ? (
                <>
                    <p>Ти залогінений</p>
                    <button onClick={logout}>Вийти</button>
                </>
            ) : (
                <>
                    <p>Будь ласка, увійди</p>
                    <button
                        onClick={() =>
                            login("bohdan.rb.dev@gmail.com", "tester")
                        }>
                        Увійти
                    </button>
                </>
            )}
        </div>
    );
};

export default Dashboard;
