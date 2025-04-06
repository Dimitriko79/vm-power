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
}

const ActionSelect: React.FC<ActionSelectProps> = ({ value, setValue }) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="bg-gray-700 border-none justify-center">
        <SelectValue
          placeholder="Select action"
          className="w-full text-center"
        />
      </SelectTrigger>
      <SelectContent className="bg-gray-800">
        <SelectItem value="on" className="text-center">
          Power On
        </SelectItem>
        <SelectItem value="off" className="text-center">
          Power Off
        </SelectItem>
        <SelectItem value="reboot" className="text-center">
          Reboot
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ActionSelect;
