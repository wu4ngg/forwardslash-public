"use client";
import Button from "@/widgets/button";
import Tab from "@/widgets/tab";
import { Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Journal", path: "/journal" },
  ];
  const pathName = usePathname();
  return (
    <div className="z-50 fixed bg-background px-8 py-4 w-full flex items-center justify-between box-border">
      <div className="flex gap-4 items-center">
        <Link href={"/"} className="hover:bg-transparent">
          <img src="/fw_logo.svg" className="h-3" />
        </Link>
      </div>
      <div className="flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="hover:bg-transparent hover:text-foreground no-underline"
          >
            <Tab selected={link.path == pathName} alignment="center" className="font-display">
              {link.name}
            </Tab>
          </Link>
        ))}
      </div>
    </div>
  );
}
