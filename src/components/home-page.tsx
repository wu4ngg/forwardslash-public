"use client";

import { motion } from "framer-motion";
import ProjectTabs from "./project_tabs";
import Footer from "./footer";
export function SidebarLeft() {
  return (
    <div className="sticky top-[5rem] flex flex-col justify-between items-end h-[calc(100vh-5rem)] w-1/2 pb-8 px-8 border-r-8 border-foreground">
      <Footer layout="sidebar" />
      <div className="flex flex-col items-end gap-2">
        <motion.img
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.4 }}
          src="/old_pic.jpg"
          className="border-4 border-foreground"
          width="128"
          height="128"
        />
        <motion.p
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.35 }}
        >It&apos;s me! (Very old pic)</motion.p>
        <motion.h2
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.3 }}
          className="text-5xl text-right text-foreground_hex/50">
          IELTS 7.5
        </motion.h2>
        <motion.h2
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.25 }}
          className="text-5xl text-right text-foreground_hex/50">
          Just graduated (GPA 3.63)
        </motion.h2>
        <motion.h2
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.2 }}
          className="text-5xl text-right text-foreground_hex/60">
          Front-end Enthusiast
        </motion.h2>
        <motion.h2
          animate={{ y: [100, 0], opacity: [0, 1] }}
          transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.15 }}
          className="text-foreground_hex/75 text-7xl text-right">
          Quang
        </motion.h2>
        <motion.h2
          animate={{ y: [100, 0], opacity: [0, 1] }}
          className="text-7xl text-right break-all">Fowardslash</motion.h2>
      </div>
    </div>
  );
}
export default function SidebarRight({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      className="w-1/2 space-y-4 pr-8"
      animate={{ y: [-100, 0], opacity: [0, 1] }}
      transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.1 }}
    >
      <div>
        <p>Just coding around, nothing special...</p>
        <p>Working from home 🏠 as a</p>
        <h3 className="text-4xl">Front-end Developer</h3>
        <p className="font-bold">@ Coqnit</p>
      </div>
      <h3>Projects</h3>
      <ProjectTabs projects={projects} />
    </motion.div>
  );
}
