export interface UserState {
    isSignedIn: boolean;
}

export type UserAction =
    | { type: "SIGN_IN", payload: boolean }
    | { type: "SIGN_OUT" };

export const initialUserState: UserState = {
    isSignedIn:  !!localStorage.getItem("access_token") || false,
};

export const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "SIGN_IN":
            return { ...state, isSignedIn: action.payload };
        case "SIGN_OUT":
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
};