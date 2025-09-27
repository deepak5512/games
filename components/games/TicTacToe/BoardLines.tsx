import React from "react";
import { motion } from "framer-motion";

export default function BoardLines() {
  return (
    <>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-muted absolute left-1/3 h-full w-1"
      ></motion.div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-muted absolute right-1/3 h-full w-1"
      ></motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="bg-muted absolute top-1/3 h-1 w-full"
      ></motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="bg-muted absolute bottom-1/3 h-1 w-full"
      ></motion.div>
    </>
  );
}
