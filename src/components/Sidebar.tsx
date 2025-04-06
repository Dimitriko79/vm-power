import {
    LayoutDashboard,
    Settings,
    LogOut,
    User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useUserContext } from "../context/userProvider.tsx";

const Sidebar = () => {
    const location = useLocation();
    const { state, onLogout } = useUserContext();
    const { isSignedIn } = state;

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
        <div className="h-screen w-16 bg-gray-900 text-white flex flex-col justify-between mt-[88px] fixed top-0 left-0 z-50 shadow-lg">
            <nav className="flex flex-col gap-2 px-2 py-4">
                {menuItems.filter(item => !!item).map(({ name, icon: Icon, path, onClick }) => {
                    const isActive = path && location.pathname === path;

                    const commonClasses = clsx(
                        "group flex items-center h-12 px-3 gap-3 rounded-md relative",
                        "transition-all duration-300 overflow-hidden",
                        "hover:w-64",
                        isActive ? "bg-gray-800" : "bg-gray-900",
                        "hover:bg-gray-800"
                    );

                    const content = (
                        <>
                            <div className="min-w-[20px] mr-2 flex justify-center">
                                <Icon size={20} />
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
                                onClick={onClick}
                                className={clsx(commonClasses, "text-left w-full")}
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link key={name} to={path!} className={commonClasses}>
                            {content}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;