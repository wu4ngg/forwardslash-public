import Link from "next/link";
import { Code, Users, Book, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/auth/authentication";
import { Dialog, DialogClose } from "@/widgets/dialog";
import Button from "@/widgets/button";
export default function Sidebar() {
  const navLinks = [
    { name: "Projects", path: "/admin", icon: <Code /> },
    { name: "Team", path: "/admin/team", icon: <Users /> },
    { name: "Journal", path: "/admin/journal", icon: <Book /> },
  ];
  const pathname = usePathname();
  return (
    <motion.div
      className="flex flex-col border-r-8 border-r-foreground sticky top-[5rem] h-[calc(100vh-5rem)] w-64 z-0"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", bounce: 0.25, velocity: 2 }}
    >
      <div className="flex-1 flex flex-col">
        {navLinks.map((link) => (
          <motion.div key={link.path} whileTap={{ scale: 0.95 }}>
            <Link
              href={link.path}
              className={`flex gap-8 items-center px-8 py-4 ${
                pathname === link.path ? "bg-foreground text-background" : ""
              }`}
            >
              {link.icon}
              <p
                className={`${pathname === link.path ? "text-background" : ""} font-display`}
              >
                {link.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
      <Dialog
        icon={<LogOut />}
        title="Log out"
        description="Are you sure you want to log out?"
        trigger={
          <motion.div whileTap={{ scale: 0.95 }}>
            <a
              
              className={`flex gap-8 items-center px-8 py-4 cursor-pointer`}
            >
              <LogOut />
              <p className="font-display">Log out</p>
            </a>
          </motion.div>
        }
      >
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => signOut(auth)}>
              Log out
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outlined">Cancel</Button>
          </DialogClose>
        </div>
      </Dialog>
    </motion.div>
  );
}
