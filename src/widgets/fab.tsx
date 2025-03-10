"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
type FabPropsType = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  icon?: React.ReactNode;
  onClick?: () => void;
  text?: string;
};
export default function FloatingActionButton(props: FabPropsType) {
  return (
    <motion.button
      className="fixed bottom-8 right-8 bg-background border-2 border-foreground p-2 flex gap-2 items-center"
      onClick={props.onClick}
      whileHover={{ scale: 1.125 }}
      whileTap={{ scale: 0.875, scaleX: 1.1, scaleY: 0.9 }}
      transition={{ ease: "backOut" }}
    >
      {props.icon}
      <p className="font-display font-bold">{props.text}</p>
    </motion.button>
  );
}
