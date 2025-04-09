import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import {useUserContext} from "../context/userProvider.tsx";

interface VmSearchInputProps {
  vmName: string;
  setVmName: (name: string) => void;
  suggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

const VmSearchInput: React.FC<VmSearchInputProps> = ({
                                                       vmName,
                                                       setVmName,
                                                       suggestions,
                                                       showSuggestions,
                                                       setShowSuggestions,
                                                     }) => {
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const suggestionRef = useRef<HTMLDivElement>(null);
    const {theme} = useUserContext();

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
      );
    }

    if (e.key === "Enter" && highlightIndex >= 0) {
      setVmName(suggestions[highlightIndex]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    if (highlightIndex >= 0 && suggestionRef.current) {
      const activeChild = suggestionRef.current.children[
          highlightIndex
          ] as HTMLDivElement;
      activeChild?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  return (
      <div className="relative w-full">
        <Input
            placeholder="Search VM..."
            value={vmName}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setVmName(e.target.value);
              setShowSuggestions(true);
              setHighlightIndex(-1); // Reset on change
            }}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`text-center ${
                theme === "dark"
                    ? "bg-gray-700 text-gray-300 placeholder-gray-400"
                    : "bg-white text-gray-700 placeholder-gray-500"
            }`}
        />

        {showSuggestions && suggestions.length > 0 && (
            <div
                ref={suggestionRef}
                className={`absolute z-10 mt-1 w-full rounded shadow text-sm max-h-60 overflow-y-auto ${
                    theme === "dark" ? "bg-gray-700" : "bg-white border border-gray-300"
                }`}
            >
              {suggestions.map((vm, index) => (
                  <div
                      key={index}
                      className={`px-3 py-2 cursor-pointer text-center ${
                          index === highlightIndex
                              ? "bg-indigo-600 text-white"
                              : theme === "dark"
                                  ? "hover:bg-gray-600 text-gray-300"
                                  : "hover:bg-gray-100 text-gray-700"
                      }`}
                      onMouseDown={() => {
                        setVmName(vm);
                        setShowSuggestions(false);
                      }}
                  >
                    {vm}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default VmSearchInput;