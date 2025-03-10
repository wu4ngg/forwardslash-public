'use client'

import { motion } from "framer-motion";

type ErrorViewPropsType = {
    emoticon: string;
    title: string;
    message: string;
}
export default function ErrorView(props: ErrorViewPropsType) {
    return <div className="flex flex-col items-center justify-center">
        <motion.h1
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.1 }}
        >{props.emoticon}</motion.h1>
        <motion.h2
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.15 }}
        >{props.title}</motion.h2>
        <motion.p
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.25, velocity: 2, delay: 0.2 }}
        >{props.message}</motion.p>
    </div>
}