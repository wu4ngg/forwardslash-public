"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
type SideHeaderType = {
  text: string;
};

export default function SideHeader(props: SideHeaderType) {
  return (
    <div className="px-8 border-r-8 bg-background border-r-foreground sticky top-[5rem] h-[calc(100vh-5rem)] z-10">
      <motion.h1
        className="vertical-text align-baseline leading-none"
        animate={{ y: [-100, 0], opacity: [0, 1] }}
        transition={{ type: "spring", bounce: 0.25, velocity: 2 }}
      >
        {props.text}
      </motion.h1>
    </div>
  );
}
