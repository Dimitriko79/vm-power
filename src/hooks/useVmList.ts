import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useVmList = () => {
  const [vmList, setVmList] = useState<string[]>([]);
  const [loadingVms, setLoadingVms] = useState(true);

  useEffect(() => {
    const fetchVms = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/vms`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Directly parse the JSON response
        if (Array.isArray(data)) {
          setVmList(data);
        } else if (Array.isArray(data.vms)) {
          setVmList(data.vms);
        } else {
          throw new Error("Unexpected VM data format");
        }
      } catch (error) {
        toast.error("Failed to fetch VM list");
        console.error("Fetch VMs Error:", error);
      } finally {
        setLoadingVms(false);
      }
    };

    fetchVms();
  }, []);

  return { vmList, loadingVms };
};
