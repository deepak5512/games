"use client";

import React from "react";
import { GameCard } from "./game-card";
import { Game, GAMES } from "@/config/constants";

const Games = ({ games = GAMES }: { games?: Game[] }) => {
  return (
    <div className="shadow-section-inset my-4 border-y border-neutral-100 px-4 dark:border-neutral-800">
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
        {games.map((game, idx) => (
          <GameCard game={game} key={game.id} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default Games;
