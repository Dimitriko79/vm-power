import { Button } from "../../components/ui/button.tsx";
import { useLogin } from "./useLogin.ts";

const Login = () => {
    const { handleLogin } = useLogin();

    return (
        <div className="w-full min-h-screen flex justify-center pt-40">
            <Button
                onClick={handleLogin}
                size="lg"
                className="bg-gray-700 border-none text-center hover:bg-gray-400 hover:text-gray-900"
            >
                Login
            </Button>
        </div>
    );
};

export default Login;