"use client";
import React, { useEffect, useState, useCallback } from "react";
import AnimateX from "./AnimateX";
import BoardLines from "./BoardLines";
import AniamteO from "./AnimateO";
import clsx from "clsx";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Type definitions for clarity
type Player = "X" | "O" | null;

// Game constants
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];
const AUTO_RESET_DELAY = 3000; // Delay for auto-restart in milliseconds

/**
 * Calculates the winner and the winning line from a board state.
 */
function calculateWinnerInfo(board: Player[]): {
  winner: Player;
  line: number[] | null;
} {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}

export default function TicTacToeVanish1v1() {
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [cells, setCells] = useState<Player[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);

  // State for each player's moves for the vanish logic
  const [playerXMoves, setPlayerXMoves] = useState<number[]>([]);
  const [playerOMoves, setPlayerOMoves] = useState<number[]>([]);

  // State to track the cell that is about to vanish
  const [vanishingCellIndex, setVanishingCellIndex] = useState<number | null>(
    null
  );

  const resetGame = useCallback(() => {
    setIsResetting(true);
    setCells(Array(9).fill(null));
    setWinner(null);
    setWinningCells([]);
    setPlayerXMoves([]);
    setPlayerOMoves([]);
    setVanishingCellIndex(null);
    setTurn("X");
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  }, []);

  const handleCellClick = (index: number) => {
    if (cells[index] !== null || winner || isResetting) return;

    const newCells = [...cells];
    newCells[index] = turn;

    if (turn === "X") {
      const newPlayerXMoves = [...playerXMoves, index];
      if (newPlayerXMoves.length > 3) {
        const oldestMove = newPlayerXMoves.shift();
        if (oldestMove !== undefined) newCells[oldestMove] = null;
      }
      setPlayerXMoves(newPlayerXMoves);
      setTurn("O");
    } else {
      // turn === "O"
      const newPlayerOMoves = [...playerOMoves, index];
      if (newPlayerOMoves.length > 3) {
        const oldestMove = newPlayerOMoves.shift();
        if (oldestMove !== undefined) newCells[oldestMove] = null;
      }
      setPlayerOMoves(newPlayerOMoves);
      setTurn("X");
    }

    setCells(newCells);
  };

  // Effect to check for a winner or draw
  useEffect(() => {
    if (winner) return;
    const { winner: currentWinner, line } = calculateWinnerInfo(cells);

    if (currentWinner) {
      setWinner(currentWinner);
      setWinningCells(line!);
    } else if (playerXMoves.length + playerOMoves.length >= 9) {
      setWinner("Draw");
    }
  }, [cells, playerXMoves.length, playerOMoves.length, winner]);

  // Effect to identify which cell will vanish next
  useEffect(() => {
    if (winner) {
      setVanishingCellIndex(null);

      return;
    }
    if (turn === "X" && playerXMoves.length >= 3) {
      setVanishingCellIndex(playerXMoves[0]);
    } else if (turn === "O" && playerOMoves.length >= 3) {
      setVanishingCellIndex(playerOMoves[0]);
    } else {
      setVanishingCellIndex(null);
    }
  }, [turn, playerXMoves, playerOMoves, winner]);

  // Effect for auto-restarting the game after it ends
  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        resetGame();
      }, AUTO_RESET_DELAY);

      return () => clearTimeout(timer);
    }
  }, [winner, resetGame]);

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-12">
        <div className="relative grid grid-cols-3">
          {cells.map((cell, index) => {
            const isVanishing = vanishingCellIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleCellClick(index)}
                className={clsx(
                  "group flex h-20 w-20 cursor-pointer items-center justify-center text-3xl font-bold text-white transition-opacity duration-300 sm:h-32 sm:w-32",
                  winner
                    ? winningCells.includes(index)
                      ? "animate-pulse opacity-100"
                      : "opacity-20"
                    : isVanishing
                      ? "opacity-40"
                      : "opacity-100"
                )}
              >
                {cell === "X" ? (
                  <AnimateX />
                ) : cell === "O" ? (
                  <AniamteO />
                ) : null}

                {/* Show a preview of the current player's mark on hover */}
                {cell === null && !winner && (
                  <div
                    className={clsx(
                      "absolute opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                    )}
                  >
                    {turn === "X" ? <AnimateX /> : <AniamteO />}
                  </div>
                )}
              </div>
            );
          })}
          <BoardLines />
        </div>

        {winner && (
          <div className="animate-pulse text-center text-2xl font-bold">
            {winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`}
          </div>
        )}
        <InteractiveHoverButton onClick={resetGame}>
          Reset
        </InteractiveHoverButton>
      </div>
    </>
  );
}
