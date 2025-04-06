import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import Dashboards from "./screens/dashboard/Dashboards.tsx";
import Login from "./screens/login/Login.tsx";
import { useEffect } from "react";
import { useUserContext } from "./context/userProvider.tsx";
import Sidebar from "./components/Sidebar.tsx";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useUserContext();
    const { isSignedIn } = state;

    useEffect(() => {
        if (!isSignedIn && location.pathname !== "/") {
            navigate("/");
        } else if (isSignedIn && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [isSignedIn, location.pathname, navigate]);

    return (
        <div className="flex w-full min-h-screen bg-gray-900 text-white">
            <main className={`flex-1 ${isSignedIn && 'ml-20'} pr-6 pt-6 w-full flex-col`}>
                <h1 className="text-4xl font-bold mb-10 text-center">
                    VM Power State Control
                </h1>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboards />} />
                </Routes>
                <Toaster position="top-right" theme="dark" />
            </main>
            {isSignedIn && <Sidebar/>}
        </div>
    );
};

export default App;