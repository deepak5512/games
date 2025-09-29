import Animate from "@/components/Animate";
import { Container } from "@/components/container";
import NineMensMorris from "@/components/games/NineMensMorris/NineMensMorris";
import TicTacToeVanish1v1 from "@/components/games/TicTacToeVanish1v1/TicTacToe";
import TicTacToeVanishSolo from "@/components/games/TicTacToeVanishSolo/TicTacToe";
import Heading from "@/components/heading";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ game: string }>;
}) {
  const { game } = await params;

  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen px-8 pt-20 md:pt-20 md:pb-10">
        <Animate classname="w-full">
          {game === "tic-tac-toe-vanish-solo" && (
            <>
              <Heading className="mb-8 flex items-center justify-center">
                Tic-Tac-Toe Vanish (Solo)
              </Heading>
              <TicTacToeVanishSolo />
            </>
          )}
          {game === "tic-tac-toe-vanish-1v1" && (
            <>
              <Heading className="mb-8 flex items-center justify-center">
                Tic-Tac-Toe Vanish (1v1)
              </Heading>
              <TicTacToeVanish1v1 />
            </>
          )}
          {game === "nine-mens-morris" && (
            <>
              {/* <Heading className="mb-8 flex items-center justify-center">
                Nine Men&#39;s Morris
              </Heading> */}
              <NineMensMorris />
            </>
          )}
        </Animate>
      </Container>
    </div>
  );
}
