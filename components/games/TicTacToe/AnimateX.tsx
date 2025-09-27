import React from "react";
import { motion } from "framer-motion";

export default function AnimateX() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center sm:h-16 sm:w-16">
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 45 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="absolute h-1 w-full bg-blue-500 sm:h-2"
      ></motion.div>
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: -45 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="absolute h-1 w-full bg-blue-500 sm:h-2"
      ></motion.div>
    </div>
  );
}
