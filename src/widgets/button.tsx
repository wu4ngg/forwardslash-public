"use client";

import { HTMLMotionProps, motion } from "framer-motion";

type VariantType = "primary" | "secondary" | "outlined";
interface ButtonPropsType extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant: VariantType;
  disabled?: boolean;
}
function comp(variant: VariantType): string {
  switch (variant) {
    case "secondary":
      return "bg-foreground text-background hover:bg-transparent hover:text-foreground border hover:border-foreground";
    case "outlined":
      return "bg-transparent border border-foreground";
    default:
      return "";
  }
}
export default function Button(props: ButtonPropsType) {
  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      transition={{ ease: "backOut" }}
      className={`px-4 py-2 flex gap-2 items-center hover:bg-foreground hover:text-background hover:[&>*]:bg-background transition-colors active:bg-foreground/55 disabled:opacity-50 ${comp(
        props.variant
      )} ${props.className}`}
    >
      {props.children}
    </motion.button>
  );
}
