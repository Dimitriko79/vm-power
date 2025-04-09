import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import Dashboards from "./screens/dashboard/Dashboards.tsx";
import Login from "./screens/login/Login.tsx";
import {useEffect, useState} from "react";
import { useUserContext } from "./context/userProvider.tsx";
import Sidebar from "./components/Sidebar.tsx";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useUserContext();
    const { isSignedIn } = state;
    const [isSideBarFocussed, setIsSideBarFocussed] = useState(false);
    const {theme} = useUserContext();

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    useEffect(() => {
        if (!isSignedIn && location.pathname !== "/") {
            navigate("/");
        } else if (isSignedIn && location.pathname === "/") {
            navigate("/dashboard");
        }
    }, [isSignedIn, location.pathname, navigate]);

    return (
        <div className="flex w-full min-h-screen bg-background text-foreground">
            <main className={`flex-1 ${isSignedIn && 'ml-20'} pr-6 pt-6 w-full flex-col`}>
                <h1 className="text-2xl xl:text-5xl md:text-4xl cm:text-3xl font-bold mb-10 text-center">
                    VM Power State Control
                </h1>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboards isSideBarFocussed={isSideBarFocussed}/>}/>
                </Routes>
                <Toaster position="top-right"/>
            </main>

            {isSignedIn && <Sidebar onSideBarFocussed={setIsSideBarFocussed}/>}
        </div>
    );
};


export default App;