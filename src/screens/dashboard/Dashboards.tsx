import { Card, CardContent } from "../../components/ui/card.tsx";
import { Loader2 } from "lucide-react";
import VmSearchInput from "../../components/VmSearchInput.tsx";
import ActionSelect from "../../components/ActionSelect.tsx";
import RunButton from "../../components/RunButton.tsx";
import HistoryPanel from "../../components/HistoryPanel.tsx";
import SyncButton from "../../components/SyncButton.tsx";
import React, { useEffect } from "react";
import { useDashboard } from "./useDashboard.ts";
import clsx from "clsx";
import {useUserContext} from "../../context/userProvider.tsx";

type DashboardsProps = {
    isSideBarFocussed: boolean;
};

const Dashboards: React.FC<DashboardsProps> = ({ isSideBarFocussed }) => {
    const {
        options,
        vmName, setVmName,
        action, setAction,
        loading,
        history, setHistory,
        showSuggestions, setShowSuggestions,
        filteredSuggestions,
        handleRun,
        handleClearHistory
    } = useDashboard();
    const {theme} = useUserContext();

    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem("vmHistory", JSON.stringify(history));
        }
    }, [history]);

    useEffect(() => {
        const saved = localStorage.getItem("vmHistory");
        if (saved) {
            try {
                const parsedHistory = JSON.parse(saved);
                if (Array.isArray(parsedHistory)) {
                    setHistory(parsedHistory);
                }
            } catch (error) {
                console.warn("Corrupt history in localStorage");
                localStorage.removeItem("vmHistory");
            }
        }
    }, []);

    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-start min-h-screen px-4 transition-all duration-300 w-full",
                isSideBarFocussed ? "opacity-50" : "opacity-100"
            )}
        >
            <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
                <Card className={clsx("relative", theme === "dark" ? "bg-gray-800" : "bg-white")}>
                    {loading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 rounded-md">
                            <Loader2 className="w-10 h-10 animate-spin text-white" />
                        </div>
                    )}
                    <CardContent
                        className={clsx(
                            "p-6 space-y-6 flex flex-col items-center",
                            loading ? "opacity-30 pointer-events-none" : ""
                        )}
                    >
                        <VmSearchInput
                            vmName={vmName}
                            setVmName={setVmName}
                            suggestions={filteredSuggestions}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                        />
                        <ActionSelect value={action} setValue={setAction} options={options}/>
                        <RunButton onClick={handleRun} loading={loading}>
                            Run
                        </RunButton>
                    </CardContent>
                </Card>

                <Card className={clsx(theme === "dark" ? "bg-gray-800" : "bg-white")}>
                    <CardContent className="p-6 space-y-4 text-center">
                        <HistoryPanel
                            history={history}
                            setVmName={setVmName}
                            clearHistory={handleClearHistory}
                        />
                    </CardContent>
                </Card>
            </div>

            <div className="w-full flex justify-center mt-8">
                <SyncButton />
            </div>
        </div>
    );
};

export default Dashboards;