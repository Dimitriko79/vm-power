import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import {useUserContext} from "../context/userProvider.tsx";

interface RunButtonProps {
  onClick: () => Promise<void>;
  loading: boolean;
  children?: React.ReactNode; // ← THIS fixes the error
}

const RunButton: React.FC<RunButtonProps> = ({
  onClick,
  loading,
  children,
}) => {
  const {theme} = useUserContext();
  return (
    <Button
      onClick={onClick}
      className={`w-full justify-center border border-input ${theme === "dark" ? "bg-gray-700 text-black hover:bg-gray-900 hover:text-gray-700" : "bg-gray-400 text-gray-700 hover:bg-gray-700 hover:text-gray-400"}`}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default RunButton;
