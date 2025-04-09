import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch, useState
} from "react";
import {
    userReducer,
    initialUserState,
    UserAction,
    UserState,
} from "./userReducer";

interface UserContextType {
    state: UserState;
    dispatch: Dispatch<UserAction>;
    onLogin: () => void;
    onLogout: () => void,
    theme: "light" | "dark";
    toggleTheme: (value: "light" | "dark") => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

interface ProviderProps {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialUserState);
    const [theme, setTheme] = useState<"light" | "dark">(() =>
        localStorage.getItem("theme") === "light" ? "light" : "dark"
    );

    const toggleTheme = (value: "light" | "dark") => {
        setTheme(value);
        localStorage.setItem("theme", value);
    }

    const onLogin = async () => {
        try {
            localStorage.setItem("access_token", "1111");
            dispatch({ type: "SIGN_IN", payload: true });
        } catch (e) {
            throw e;
        }
    };

    const onLogout = async () => {
        try {
            localStorage.removeItem("access_token");
            dispatch({ type: "SIGN_OUT" });
        } catch (e) {
            throw e;
        }
    };

    return (
        <UserContext.Provider value={{ state, dispatch, onLogin, onLogout, theme, toggleTheme }}>
            {children}
        </UserContext.Provider>
    );
};