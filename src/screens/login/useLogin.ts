import {useCallback} from "react";
import {toast} from "sonner";
import {useUserContext} from "../../context/userProvider.tsx";

export const useLogin = () => {
    const {onLogin} = useUserContext();

    const handleLogin = useCallback(async () => {
        try {
            await onLogin();
            toast.success(
                `User succeeded login`)
        } catch (e){
            console.error(e);
            toast.error("Error while performing action");
        }

    }, []);

    return {
        handleLogin
    }
}
