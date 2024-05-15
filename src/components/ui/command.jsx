"use client";
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Command Component
const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("flex flex-col h-full w-full overflow-hidden rounded-md text-white", className)}
    {...props} />
));
Command.displayName = CommandPrimitive.displayName;

// Command Dialog Component
const CommandDialog = ({ children, ...props }) => (
  <Dialog {...props}>
    <DialogContent className="p-0 overflow-hidden shadow-lg">
      <Command className="p-2 space-y-2">
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

// Command Input Component
const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="flex items-center w-full px-3 border-b bg-slate-500" cmdk-input-wrapper="">
    <Search className="w-4 h-10 mr-2 shrink-0 opacity-90" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn("flex items-center w-full h-11 py-3 text-sm bg-transparent outline-none placeholder:text-gray-500", className)}
      {...props} />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

// Command List Component
const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto", className)}
    {...props} />
));
CommandList.displayName = CommandPrimitive.List.displayName;

// Command Empty Component
const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// Command Group Component
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("overflow-hidden p-1 text-white", className)}
    {...props} />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// Command Separator Component
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// Command Item Component
const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn("relative flex items-center px-2 py-1.5 text-md bg-black text-white rounded-sm outline-none", className)}
    {...props} />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

// Command Shortcut Component
const CommandShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />
);
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
