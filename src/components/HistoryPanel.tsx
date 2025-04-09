import React from "react";
import {useUserContext} from "../context/userProvider.tsx";

interface HistoryPanelProps {
  history: string[];
  setVmName: (vm: string) => void;
  clearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  setVmName,
  clearHistory
}) => {
    const {theme} = useUserContext();
  return (
    <div className={`p-6 rounded shadow text-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
      <h2 className="text-xl font-semibold mb-4">History</h2>
      {history.length > 0 ? (
        <div className="space-y-2">
          {history.map((vm, index) => (
            <p
              key={index}
              className="cursor-pointer hover:underline"
              onClick={() => setVmName(vm)}
            >
              {vm}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No history yet</p>
      )}
      <button
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        onClick={clearHistory}
      >
        Clear History
      </button>
    </div>
  );
};

export default HistoryPanel;
