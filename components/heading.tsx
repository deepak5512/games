"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const Heading = ({
  as: Tag = "h1",
  children,
  className = "",
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: 0.2,
      }}
    >
      <Tag
        className={cn(
          "text-primary px-4 text-2xl font-bold tracking-tighter drop-shadow-lg md:text-4xl dark:text-neutral-200",
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

export default Heading;
