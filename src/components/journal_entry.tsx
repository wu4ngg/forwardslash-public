"use client";
import { IJournal } from "@/types/journal.type";
import Button from "@/widgets/button";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";
type JournalEntryProps = {
  index: number;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
};
export default function JournalEntry(props: IJournal & JournalEntryProps) {
  return (
    <motion.div
      layout
      animate={{ y: [-10 - props.index * 10, 0], opacity: [0, 1] }}
      transition={{
        duration: 0.4,
        ease: ["backOut"],
        delay: props.index * 0.01,
      }}
      key={props.id}
      className="cursor-pointer w-full"
    >
      <motion.div
        layout
        whileHover={{ scale: 1.015, y: -5 }}
        whileTap={{ scale: 0.985, y: 0 }}
        transition={{ duration: 0.4, ease: ["circOut"] }}
        className="w-full"
      >
        <motion.div
          layout
          whileHover={{ scale: 1.015, y: -5 }}
          whileTap={{ scale: 0.985, y: 0 }}
          transition={{ duration: 0.4, ease: ["circOut"] }}
          key={props.id}
          className="w-full border-4 border-foreground flex flex-col cursor-pointer hover:shadow-lg transition-shadow no-underline hover:bg-transparent hover:text-foreground duration-300"
        >
          {props.image && props.image != "" && (
            <img src={props.image} alt={props.title} className="w-full" />
          )}
          <div className="flex flex-col gap-2 p-4">
            <p>
              {props.createdAt instanceof Timestamp
                ? (props.createdAt as Timestamp).toDate().toLocaleDateString()
                : (props.createdAt as Date).toLocaleDateString()}
            </p>
            <h3 className="line-clamp-2">{props.title}</h3>
            <p className="line-clamp-3">{props.content}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
