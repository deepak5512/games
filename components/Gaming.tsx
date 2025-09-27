import { GAMES } from "@/config/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Gaming() {
  return (
    <div className="flex w-full flex-1 flex-col space-y-4 sm:space-y-8">
      <h1 className="text-2xl font-bold sm:text-3xl">
        Choose a game and have fun!
      </h1>
      <div className="flex flex-wrap gap-4">
        {/* eslint-disable-next-line */}
        {GAMES.map((game: any, index: any) => (
          <Link
            key={index}
            href={`/${game.link}`}
            className="group"
            title={game.name}
          >
            <div className="group-hover:before:animate-rotate relative flex h-full flex-col items-center overflow-hidden p-[1.5px] before:absolute before:-inset-8 before:-z-10 before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-sky-500 before:to-transparent before:to-20% before:opacity-0 group-hover:before:opacity-100">
              <div className="bg-background before:bg-muted/30 relative z-10 flex h-full w-28 flex-col items-center justify-between gap-2 border p-3 pb-2 before:absolute before:inset-0">
                <Image
                  src={game.thumbnail}
                  alt="Tic Tac Toe"
                  width={56}
                  height={56}
                />
                <p className="line-clamp-2 text-center text-xs">{game.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-center text-sm">
        Will try to add more games...
      </div>
    </div>
  );
}
