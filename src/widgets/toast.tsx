import { useToast } from "@/components/toast";
import { motion, useIsPresent } from "framer-motion";

export default function Toast(props: { title: string, message: string, type: "success" | "error", id: string }) {
    const { removeTimeout, resumeTimeout } = useToast();
    const isPresent = useIsPresent();
    return (
        <motion.div className="bg-background border-2 border-foreground p-4 max-w-screen-sm shadow-lg"
            layout
            style={{ position: isPresent ? "static" : "absolute" }}
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 1000 }}
            transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.1 }}
            onHoverStart={() => resumeTimeout(props.id)}
            onHoverEnd={() => removeTimeout(props.id)}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-foreground/20">
                <motion.div
                    className="h-full bg-foreground"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3, ease: "linear" }}
                />
            </div>
            <h6 className="font-bold font-display text-xl text-right">{props.title}</h6>
            <p className="text-right">{props.message}</p>
        </motion.div>
    )
}