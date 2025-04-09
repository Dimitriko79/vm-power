import React, {useState} from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import {useUserContext} from "../context/userProvider.tsx";

interface ActionSelectProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: {value: string, label: string}[]
}

const ActionSelect: React.FC<ActionSelectProps> = ({ value, setValue, options}) => {
    const [open, setOpen] = useState(false)
    const {theme} = useUserContext();

  return (
    <Select value={value} onValueChange={setValue} onOpenChange={setOpen}>
      <SelectTrigger open={open} className={`border border-input justify-center ${theme === "dark" ? "bg-gray-700 text-black" : "bg-white"}`}>
        <SelectValue
          placeholder="Select action"
          className="w-full text-center"
        />
      </SelectTrigger>
      <SelectContent className={` ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        {options.map((option, index) => (
            <SelectItem
                key={index}
                value={option.value}
                className={`text-center ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 data-[state=checked]:bg-gray-600" : "bg-white hover:bg-gray-400 focus:bg-gray-400 data-[state=checked]:bg-gray-400"}`}
            >
              {option.label}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ActionSelect;
