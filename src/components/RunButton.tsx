import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

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
  return (
    <Button
      onClick={onClick}
      className="w-full justify-center"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
};

export default RunButton;
