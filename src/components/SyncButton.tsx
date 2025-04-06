import { useState } from "react";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";
import { toast } from "sonner";

const SyncButton = () => {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/sync/now`, {
        method: "GET",
      });

      const result = await res.json();

      if (res.status === 200) {
        toast.success(result.status || "Sync completed successfully");
      } else {
        toast.error(result.status || "Sync failed");
      }
    } catch {
      toast.error("Failed to sync. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 w-full">
      <Button
        onClick={handleSync}
        disabled={syncing}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 
                   hover:from-indigo-600 hover:to-purple-700 
                   text-white font-semibold text-lg px-8 py-3 
                   rounded-lg shadow-md hover:shadow-xl 
                   transition-all duration-300 ease-in-out"
      >
        {syncing ? (
          <>
            <RotateCw className="mr-2 h-5 w-5 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <RotateCw className="mr-2 h-5 w-5" />
            Sync
          </>
        )}
      </Button>
    </div>
  );
};

export default SyncButton;
