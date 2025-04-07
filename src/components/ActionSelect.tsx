import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface ActionSelectProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: {value: string, label: string}[]
}

const ActionSelect: React.FC<ActionSelectProps> = ({ value, setValue, options }) => {

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="bg-gray-700 border-none justify-center">
        <SelectValue
          placeholder="Select action"
          className="w-full text-center"
        />
      </SelectTrigger>
      <SelectContent className="bg-gray-800">
        {options.map((option, index) => (
            <SelectItem
                key={index}
                value={option.value}
                className="text-center bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 data-[state=checked]:bg-gray-600"
            >
              {option.label}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ActionSelect;
