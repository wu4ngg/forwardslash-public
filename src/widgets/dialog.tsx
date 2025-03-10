"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export const DialogTrigger = RadixDialog.Trigger;
export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;
export const DialogClose = RadixDialog.Close;

export function DialogOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RadixDialog.Overlay className="fixed inset-0 bg-black/75 z-40" />
    </motion.div>
  );
}
export function Dialog(
  props: RadixDialog.DialogProps & {
    className?: string;
    title?: string;
    description?: string;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    icon?: React.ReactNode;
  }
) {
  const [open, setOpen] = useState(props.open);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open])
  return (
    <RadixDialog.Root
      {...props}
      open={open}
      onOpenChange={props.onOpenChange || setOpen}
    >
      {props.trigger ? (
        <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      ) : (
        <DialogTrigger />
      )}
      <AnimatePresence>
        {open && (
          <RadixDialog.Portal forceMount>
            <DialogOverlay />
            <RadixDialog.Content
              className={`${props.className} min-w-[25%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50`}
            >
              <motion.div
                layout
                initial={{ opacity: 1, scale: .85, scaleY: 0.85 }}
                animate={{ opacity: 1, scale: 1, scaleY: 1 }}
                exit={{ opacity: 0, scale: .85, scaleY: 0.85 }}
                transition={{ type: "spring", bounce: 0, velocity: 3 }}
                className="bg-background border-4 border-foreground p-8 flex flex-col gap-2"
              >
                <div>
                  {props.icon}
                  <DialogTitle className="text-2xl font-bold">
                    {props.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {props.description}
                  </DialogDescription>
                </div>
                {props.children}
              </motion.div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  );
}
