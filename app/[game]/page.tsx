import Animate from "@/components/Animate";
import { Container } from "@/components/container";
import TicTacToe from "@/components/games/TicTacToe/TicTacToe";
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
          <div className="flex flex-1 flex-col items-center justify-center">
            {game === "tic-tac-toe" && <TicTacToe />}
          </div>
        </Animate>
      </Container>
    </div>
  );
}
