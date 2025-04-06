import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    Dispatch,
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
    onLogout: () => void
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
        <UserContext.Provider value={{ state, dispatch, onLogin, onLogout }}>
            {children}
        </UserContext.Provider>
    );
};