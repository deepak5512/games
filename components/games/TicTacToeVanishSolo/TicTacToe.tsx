"use client";
import React, { useEffect, useState, useCallback } from "react";
import AnimateX from "./AnimateX";
import BoardLines from "./BoardLines";
import AniamteO from "./AnimateO";
import clsx from "clsx";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Type definitions for clarity
type Player = "X" | "O" | null;

// --- Merged Logic Constants ---

const HUMAN_PLAYER = "X" as const;
const BOT_PLAYER = "O" as const;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const MAX_DEPTH = 6;
const AUTO_RESET_DELAY = 3000; // Delay for auto-restart in milliseconds

// --- Merged AI and Helper Functions ---

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

function boardToKey(board: Player[]): string {
  return board.map((cell) => cell ?? "-").join("");
}

function minimax(
  currentBoard: Player[],
  currentHumanMoves: number[],
  currentBotMoves: number[],
  isMaximizing: boolean,
  depth: number,
  memo: Map<string, number>
): number {
  const key =
    boardToKey(currentBoard) +
    (isMaximizing ? "max" : "min") +
    depth.toString();
  if (memo.has(key)) return memo.get(key)!;

  const { winner: gameWinner } = calculateWinnerInfo(currentBoard);
  if (gameWinner === BOT_PLAYER) return 10 - depth;
  if (gameWinner === HUMAN_PLAYER) return depth - 10;
  if (currentBoard.every((cell) => cell !== null) || depth >= MAX_DEPTH) {
    return 0;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < 9; i++) {
    if (currentBoard[i] === null) {
      const newBoard = [...currentBoard];
      let score;

      if (isMaximizing) {
        newBoard[i] = BOT_PLAYER;
        const newBotMoves = [...currentBotMoves, i];
        if (newBotMoves.length > 3) {
          newBoard[newBotMoves[0]] = null;
          newBotMoves.shift();
        }
        score = minimax(
          newBoard,
          [...currentHumanMoves],
          newBotMoves,
          false,
          depth + 1,
          memo
        );
        bestScore = Math.max(score, bestScore);
      } else {
        newBoard[i] = HUMAN_PLAYER;
        const newHumanMoves = [...currentHumanMoves, i];
        if (newHumanMoves.length > 3) {
          newBoard[newHumanMoves[0]] = null;
          newHumanMoves.shift();
        }
        score = minimax(
          newBoard,
          newHumanMoves,
          [...currentBotMoves],
          true,
          depth + 1,
          memo
        );
        bestScore = Math.min(score, bestScore);
      }
    }
  }

  memo.set(key, bestScore);

  return bestScore;
}

function findBestMove(
  currentBoard: Player[],
  humanMoves: number[],
  botMoves: number[]
): number {
  let bestScore = -Infinity;
  let move = -1;
  const memo = new Map<string, number>();

  const availableMoves = currentBoard
    .map((cell, idx) => (cell === null ? idx : -1))
    .filter((idx) => idx !== -1);
  if (availableMoves.length === 0) return -1;

  for (const i of availableMoves) {
    const newBoard = [...currentBoard];
    newBoard[i] = BOT_PLAYER;

    const tempBotMovesForMinimax = [...botMoves, i];
    if (tempBotMovesForMinimax.length > 3) {
      newBoard[tempBotMovesForMinimax[0]] = null;
      tempBotMovesForMinimax.shift();
    }

    const score = minimax(
      newBoard,
      [...humanMoves],
      tempBotMovesForMinimax,
      false,
      1,
      memo
    );

    if (score > bestScore) {
      bestScore = score;
      move = i;
    }
  }

  return move === -1 ? availableMoves[0] : move;
}

export default function TicTacToeVanishSolo() {
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [cells, setCells] = useState<Player[]>(Array(9).fill(null));
  const [winner, setWinner] = useState<Player | "Draw">(null);
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [humanMoves, setHumanMoves] = useState<number[]>([]);
  const [botMoves, setBotMoves] = useState<number[]>([]);

  // **NEW**: State to track the cell that is about to vanish
  const [vanishingCellIndex, setVanishingCellIndex] = useState<number | null>(
    null
  );

  const resetGame = useCallback(() => {
    setIsResetting(true);
    setCells(Array(9).fill(null));
    setWinner(null);
    setWinningCells([]);
    setHumanMoves([]);
    setBotMoves([]);
    setVanishingCellIndex(null); // Reset vanishing cell
    setTurn(HUMAN_PLAYER);
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  }, []);

  const handleCellClick = (index: number) => {
    if (cells[index] !== null || turn === "O" || winner || isResetting) return;

    const newCells = [...cells];
    newCells[index] = HUMAN_PLAYER;

    const newHumanMoves = [...humanMoves, index];
    if (newHumanMoves.length > 3) {
      const oldestMove = newHumanMoves.shift();
      if (oldestMove !== undefined) {
        newCells[oldestMove] = null;
      }
    }

    setHumanMoves(newHumanMoves);
    setCells(newCells);
    setTurn(BOT_PLAYER);
  };

  const handleComputerMove = useCallback(() => {
    const move = findBestMove(cells, humanMoves, botMoves);
    if (move === -1) return;

    const newCells = [...cells];
    newCells[move] = BOT_PLAYER;

    const newBotMoves = [...botMoves, move];
    if (newBotMoves.length > 3) {
      const oldestMove = newBotMoves.shift();
      if (oldestMove !== undefined) {
        newCells[oldestMove] = null;
      }
    }

    setBotMoves(newBotMoves);
    setCells(newCells);
    setTurn(HUMAN_PLAYER);
  }, [cells, humanMoves, botMoves]);

  useEffect(() => {
    if (winner) return; // Don't check for a new winner if one already exists
    const { winner: currentWinner, line } = calculateWinnerInfo(cells);

    if (currentWinner) {
      setWinner(currentWinner);
      setWinningCells(line!);
    } else if (humanMoves.length + botMoves.length >= 9) {
      setWinner("Draw");
    }
  }, [cells, humanMoves.length, botMoves.length, winner]);

  useEffect(() => {
    if (!winner && turn === BOT_PLAYER && !isResetting) {
      const timeout = setTimeout(() => {
        handleComputerMove();
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [turn, winner, isResetting, handleComputerMove]);

  // **NEW**: Effect to identify which cell will vanish next
  useEffect(() => {
    if (winner) {
      setVanishingCellIndex(null);

      return;
    }
    if (turn === HUMAN_PLAYER && humanMoves.length >= 3) {
      setVanishingCellIndex(humanMoves[0]);
    } else if (turn === BOT_PLAYER && botMoves.length >= 3) {
      setVanishingCellIndex(botMoves[0]);
    } else {
      setVanishingCellIndex(null);
    }
  }, [turn, humanMoves, botMoves, winner]);

  // **NEW**: Effect for auto-restarting the game after it ends
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
            // **NEW**: Flag to check if the current cell is the one vanishing
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
                      ? "opacity-40" // **NEW**: Apply lower opacity for the vanishing cell
                      : "opacity-100"
                )}
              >
                {cell === "X" ? <AnimateX /> : cell === "O" ? <AniamteO /> : ""}
                <div
                  className={clsx(
                    "absolute opacity-0 transition-opacity duration-300",
                    cell === null && turn === "X"
                      ? "group-hover:opacity-10"
                      : "opacity-0"
                  )}
                >
                  <AnimateX />
                </div>
              </div>
            );
          })}
          <BoardLines />
        </div>

        {winner && (
          <div className="animate-pulse text-center text-2xl font-bold">
            {winner === "X"
              ? "You Win!"
              : winner === "O"
                ? "You Lose!"
                : "Draw!"}
          </div>
        )}
        <InteractiveHoverButton onClick={resetGame}>
          Reset
        </InteractiveHoverButton>
      </div>
    </>
  );
}
