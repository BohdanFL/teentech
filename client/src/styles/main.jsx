import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import App from "../App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <Provider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </QueryClientProvider>
            </Provider>
        </AuthProvider>
    </StrictMode>
);
