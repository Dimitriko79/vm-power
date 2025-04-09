import {
    LayoutDashboard,
    Settings,
    LogOut,
    User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useUserContext } from "../context/userProvider.tsx";
import React from "react";

type SidebarProps = {
    onSideBarFocussed: (focused: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({onSideBarFocussed}) => {
    const location = useLocation();
    const { state, onLogout } = useUserContext();
    const { isSignedIn } = state;
    const {theme, toggleTheme} = useUserContext();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Settings", icon: Settings, path: "/settings" },
        isSignedIn
            ? { name: "Logout", icon: LogOut, onClick: onLogout }
            : null,
        isSignedIn
            ? { name: "Profile", icon: User, path: "/profile" } : null
    ];

    return (
        <div
            className={`h-screen w-16 text-white flex flex-col justify-between pt-6 fixed top-0 left-0 z-50 shadow-lg ${theme === "dark" ? "bg-gray-900" : "bg-gray-900"}`}
            onMouseEnter={() => onSideBarFocussed(true)}
            onMouseLeave={() => onSideBarFocussed(false)}
        >
            <nav className="flex flex-col gap-2 px-2">
                {menuItems.filter(item => !!item).map(({name, icon: Icon, path, onClick}) => {
                    const isActive = path && location.pathname === path;

                    const commonClasses = clsx(
                        "group flex items-center h-12 px-3 gap-3 rounded-md relative",
                        "transition-all duration-300 overflow-hidden",
                        "hover:w-[220px]",
                        isActive ? "bg-gray-700" : "bg-gray-900",
                        "hover:bg-gray-700"
                    );

                    const content = (
                        <>
                            <div className="min-w-[20px] mr-2 flex justify-center">
                                <Icon size={20}/>
                            </div>
                            {name !== "Profile" ? (
                                <span
                                    className={clsx(
                                        "whitespace-nowrap text-sm font-medium",
                                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    )}
                                >
                                {name}
                                </span>
                            ) : (
                                <div
                                    className={clsx(
                                        "whitespace-nowrap text-sm font-medium",
                                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    )}
                                >
                                    <p className="font-medium">David Levi</p>
                                    <p className="text-gray-400 text-xs">davidLevi35@gmail.com</p>
                                </div>
                            )}
                        </>
                    );

                    if (onClick) {
                        return (
                            <button
                                key={name}
                                onClick={() => {
                                    onClick();
                                    onSideBarFocussed(false);
                                }}
                                className={clsx(commonClasses, "text-left w-full")}
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={name}
                            to={path!}
                            onClick={() => onSideBarFocussed(false)}
                            className={clsx(
                                commonClasses,
                                "appearance-none w-full"
                            )}
                        >
                            {content}
                        </Link>
                    );
                })}
            </nav>
            <button
                onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
                className="my-4 mx-2"
            >
                <div
                    className="w-12 h-6 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300">
                    <div
                        className={`transform transition-transform duration-300 w-4 h-4 rounded-full shadow-md flex items-center justify-center ${
                            theme === "dark" ? "translate-x-6 bg-white" : "translate-x-0 bg-gray-700"
                        }`}
                    >
                        {/*{theme === "dark" ? "🌙" : "🌞"}*/}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Sidebar;