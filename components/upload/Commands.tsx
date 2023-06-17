import { Copy, ExternalLink } from "lucide-react";
import { UploadIcon } from "@/components/media/icons/UploadIcon";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dispatch, useState } from "react";
import { Actions, ActionType } from "./useUploadState";
interface CommandsProps {
  link: string;
  dispatch: Dispatch<ActionType>;
}
export const Commands = ({ link, dispatch }: CommandsProps) => {
  const [copied, setCopied] = useState<boolean>();
  return (
    <Command className="rounded-lg border shadow-md mt-4">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem>
            <Button
              onClick={() => {
                dispatch({ type: Actions.Reset });
              }}
              className="bg-gradient-to-r from-gray-600 to-gray-900 p-1 w-full cursor-pointer flex items-center"
            >
              <UploadIcon className="w-8 h-8" />
              <p className={"ml-2"}>{"Upload again"}</p>
            </Button>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            {(copied && (
              <Button className="bg-gradient-to-r from-gray-600 to-gray-900 p-2  w-full cursor-pointer flex items-center">
                <Copy className="w-6 h-6" />
                <p className={"ml-2"}>{"Copied ✅"}</p>
              </Button>
            )) || (
              <Button
                onClick={() => {
                  setCopied(true);
                  navigator.clipboard.writeText(link);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
                className="bg-gradient-to-r from-gray-600 to-gray-900 p-2  w-full cursor-pointer flex items-center"
              >
                <Copy className="w-6 h-6" />
                <p className={"ml-2"}>{"Copy link"}</p>
              </Button>
            )}
          </CommandItem>
          <CommandItem>
            <Button
              onClick={() => window.open(link, "_blank")}
              className="bg-gradient-to-r from-gray-600 to-gray-900 p-2  w-full cursor-pointer flex items-center"
            >
              <ExternalLink className="w-6 h-6" />
              <p className={"ml-2"}>{"Open link"}</p>
            </Button>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
