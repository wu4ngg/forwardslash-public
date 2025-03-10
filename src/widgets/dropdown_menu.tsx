import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
type AdditionalDropdownMenuProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
export const DropdownMenuContent = RadixDropdownMenu.Content;
export const DropdownMenuItem = (
  props: RadixDropdownMenu.DropdownMenuItemProps
) => {
  return (
    <motion.div
      whileHover={{ scale: 1.125 }}
      whileTap={{ scale: 0.875, scaleX: 1.1, scaleY: 0.9 }}
      transition={{ ease: "backOut" }}
      className="w-full"
    >
      <RadixDropdownMenu.Item {...props} className="p-2 hover:bg-foreground cursor-pointer hover:text-background flex gap-2 items-center" />
    </motion.div>
  );
};
export const DropdownMenu = (
  props: RadixDropdownMenu.DropdownMenuProps & AdditionalDropdownMenuProps
) => {
  const [open, setOpen] = React.useState(props.open);
  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  return (
    <RadixDropdownMenu.Root
      {...props}
      onOpenChange={props.onOpenChange || setOpen}
      open={open}
    >
      {props.trigger ? (
        <DropdownMenuTrigger asChild>{props.trigger}</DropdownMenuTrigger>
      ) : (
        <DropdownMenuTrigger />
      )}
      <AnimatePresence>
        {open && (
            <RadixDropdownMenu.Content forceMount
              className="p-4 "
            >
              <motion.div
                layout
                initial={{ opacity: 1, scaleY: 0.85 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.85 }}
                transition={{ type: "spring", bounce: 0, velocity: 3 }}
                className={`bg-background border-4 border-foreground p-2 flex flex-col translate-y-8 origin-top min-w-48 ${props.className || ""}`}
              >
                {props.children}
              </motion.div>
            </RadixDropdownMenu.Content>
        )}
      </AnimatePresence>
    </RadixDropdownMenu.Root>
  );
};
