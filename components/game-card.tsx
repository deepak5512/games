"use client";

import React from "react";
import { motion } from "framer-motion";
import { Game } from "@/config/constants";
import Image from "next/image";
import { Link } from "next-view-transitions";

export const GameCard = ({ game, index }: { game: Game; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
      className="group relative flex h-80 cursor-pointer flex-col items-start text-left"
    >
      <Link href={`/${game.link}`} className="absolute inset-0 z-10 rounded-xl">
        <Image
          src={game.thumbnail}
          alt={game.name}
          height={300}
          width={300}
          className="h-48 w-full rounded-xl object-cover transition duration-200 group-hover:scale-[1.02]"
        />
        <div className="transition-transform duration-300 group-hover:translate-x-1">
          <h2 className="z-20 mt-2 font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
            {game.name}
          </h2>
          <p className="mt-2 max-w-sm text-xs text-neutral-500 dark:text-neutral-400">
            {`${game.description.substring(0, 100)}...`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
