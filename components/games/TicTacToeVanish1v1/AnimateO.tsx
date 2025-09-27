import React from "react";
import { motion } from "framer-motion";

export default function AniamteO() {
  const circleRadius = 40; // Radius for the circle
  const circleCircumference = 2 * Math.PI * circleRadius;

  return (
    <svg
      viewBox="0 0 100 100"
      style={{ position: "absolute" }}
      className="h-10 w-10 -rotate-90 text-red-600 sm:h-16 sm:w-16"
    >
      <motion.circle
        cx="50"
        cy="50"
        r={circleRadius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth="8"
        strokeDasharray={circleCircumference}
        strokeDashoffset={circleCircumference}
        initial={{ strokeDashoffset: circleCircumference }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
}
