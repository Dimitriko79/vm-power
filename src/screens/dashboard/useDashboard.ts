import {toast} from "sonner";
import {useVmList} from "../../hooks/useVmList.ts";
import {useState} from "react";

export const useDashboard = () => {

    const { vmList } = useVmList();
    const [vmName, setVmName] = useState("");
    const [action, setAction] = useState("on");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false); // <-- Added state for showSuggestions

    const filteredSuggestions = vmList
        .filter((vm) => vm.toLowerCase().includes(vmName.toLowerCase()))
        .slice(0, 5);

    const handleRun = async () => {
        if (!vmName) return;
        setLoading(true);
        try {
            let url = `${import.meta.env.VITE_API_BASE_URL}/vm/${vmName}`;
            url += action === "reboot" ? "/reboot" : `/power/${action}`;

            const response = await fetch(url, { method: "POST" });
            const result = await response.json();

            if (response.status === 200 && result.success !== false) {
                if (!history.includes(vmName)) {
                    const updated = [vmName, ...history].slice(0, 10);
                    setHistory(updated);
                }
                toast.success(
                    result.message || `Action '${action}' succeeded for ${vmName}`
                );
            } else {
                toast.error(
                    result.message || `Action '${action}' failed for ${vmName}`
                );
            }
        } catch {
            toast.error("Error while performing action");
        } finally {
            setLoading(false);
        }
    };

    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem("vmHistory");
    };
    return {
        vmName, setVmName,
        action, setAction,
        loading,
        history, setHistory,
        showSuggestions, setShowSuggestions,
        filteredSuggestions,
        handleRun,
        handleClearHistory
    }
}