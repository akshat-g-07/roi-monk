"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { currency } from "@/data/currency";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { CheckIcon } from "@radix-ui/react-icons";
import { UpdateCurrency } from "@/actions/user";
import { toast } from "react-toastify";

export default function Currency() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const options = currency.map((item) => `${item.name} - ${item.currency}`);

  return (
    <>
      <Card className="h-fit">
        <CardHeader>Currency</CardHeader>
        <CardContent>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[400px] justify-between"
              >
                {value ? value : "Select Currency..."}
                <UnfoldMoreIcon
                  sx={{
                    marginLeft: "0.5rem",
                    height: "1rem",
                    width: "1rem",
                    opacity: 0.5,
                  }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search Currency..." />
                <CommandList>
                  <CommandEmpty>No option.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option, index) => (
                      <CommandItem
                        key={index}
                        value={option}
                        onSelect={async (currentValue) => {
                          setOpen(false);
                          if (currentValue !== value) {
                            setValue(currentValue);
                            const response = await UpdateCurrency(currentValue);

                            if (response.message === "error") {
                              toast.error(
                                `Uh oh! Something went wrong.\nPlease try again.`
                              );
                            } else {
                              toast.success("Currency updated successfully!!");
                            }
                          }
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </>
  );
}
