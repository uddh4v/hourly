import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input"; // Ensure this is available
import { Dispatch, SetStateAction } from "react";

type Option = { label: string; value: string };

interface ISelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: string[]; // It should be an array of strings
  setSelectedOptions: Dispatch<SetStateAction<string[]>>; // Correct type for setter function
}

const MultiSelect = ({
  placeholder,
  options: values,
  selectedOptions,
  setSelectedOptions,
}: ISelectProps) => {
  const [search, setSearch] = useState("");

  const handleSelectChange = (value: string) => {
    // Toggle selection of option
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value); // Remove if already selected
      } else {
        return [...prev, value]; // Add if not selected
      }
    });
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedOptions.includes(value); // Check if option is selected
  };

  const filteredOptions = values.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between text-[#8E8E8E]"
        >
          <div className="truncate text-left">
            {selectedOptions.length > 0
              ? values
                  .filter((opt) => selectedOptions.includes(opt.value))
                  .map((opt) => opt.label)
                  .join(", ")
              : placeholder}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 max-h-64 overflow-y-auto"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full"
          />
        </div>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((value, index) => (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.value)}
              onCheckedChange={() => handleSelectChange(value.value)}
            >
              {value.label}
            </DropdownMenuCheckboxItem>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-muted-foreground">
            No options found
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiSelect;
