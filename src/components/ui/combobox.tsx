"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";

interface Props {
  name?: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function Combobox({
  values,
  selectedValue,
  setSelectedValue,
  name,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValue ? (
            values.find((value) => value === selectedValue)
          ) : (
            <span className="text-white/60 font-normal">
              Select {name ? name + "..." : ""}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            placeholder={name ? `Search ${name}...` : "Search..."}
          />
          <CommandEmpty>
            {name ? `No ${name} found.` : "No found."}
          </CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[200px]">
              {values.map((value) => (
                <CommandItem
                  key={value}
                  onSelect={(currentValue) => {
                    setSelectedValue(
                      values.find(
                        (item) => item.toLowerCase() === currentValue
                      ) || ""
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {value}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
