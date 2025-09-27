"use client";
import React, { useEffect, useState } from "react";
import AnimateX from "./AnimateX";
import BoardLines from "./BoardLines";
import AniamteO from "./AnimateO";
import clsx from "clsx";
import { IconRotateClockwise } from "@tabler/icons-react";

export default function TicTacToe() {
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState<string>("");
  const [winningCells, setWinningCells] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (index: number) => {
    if (cells[index] !== "" || turn === "O" || winner || isResetting) return;
    const newCells = [...cells];
    newCells[index] = turn;
    if (newCells[index] === "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
    checkWinner(newCells);
    setCells(newCells);
  };

  const checkWinner = (updatedCells: string[]) => {
    winningCombos.forEach((combo) => {
      const [a, b, c] = combo;
      if (
        updatedCells[a] &&
        updatedCells[a] === updatedCells[b] &&
        updatedCells[a] === updatedCells[c]
      ) {
        setWinner(updatedCells[a]);
        setWinningCells(combo);
      }
    });
  };

  const handleComputerMove = () => {
    const emptyCells = cells
      .map((cell, i) => (cell === "" ? i : null))
      .filter((cell) => cell !== null);
    if (emptyCells.length === 0) {
      setWinner("Draw");
    }
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const newCells = [...cells];
    newCells[emptyCells[randomIndex]] = "O";
    setCells(newCells);
    checkWinner(newCells);
    setTurn("X");
  };

  useEffect(() => {
    if (!winner && turn === "O" && !isResetting) {
      const timeout = setTimeout(() => {
        handleComputerMove();
      }, 600);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [turn, winner, isResetting]);

  const resetGame = () => {
    setIsResetting(true);
    setCells(Array(9).fill(""));
    setWinner("");
    setTurn("X");
    setTimeout(() => {
      setIsResetting(false);
    }, 500);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-12">
      <div className="relative grid grid-cols-3">
        {cells.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className={clsx(
              "group flex h-20 w-20 cursor-pointer items-center justify-center text-3xl font-bold text-white sm:h-32 sm:w-32",
              winner
                ? winningCells.includes(index)
                  ? "animate-pulse opacity-100"
                  : "opacity-20"
                : "opacity-100"
            )}
          >
            {cell === "X" ? <AnimateX /> : cell === "O" ? <AniamteO /> : ""}

            <div
              className={clsx(
                "absolute opacity-0 transition-opacity duration-300",
                cell === ""
                  ? turn === "X"
                    ? "group-hover:opacity-10"
                    : ""
                  : "opacity-0"
              )}
            >
              <AnimateX />
            </div>
          </div>
        ))}
        <BoardLines />
      </div>

      {winner && (
        <div className="text-center text-2xl font-bold">
          {winner === "X" ? "You Win!" : winner === "O" ? "You Lose!" : "Draw!"}
        </div>
      )}
      <div className="before:animate-rotate group relative overflow-hidden rounded-md p-[1.5px] before:absolute before:-inset-8 before:-z-10 before:bg-[conic-gradient(var(--tw-gradient-stops))] before:from-sky-600 before:to-transparent before:to-90% before:opacity-0 hover:before:opacity-100">
        <button
          onClick={() => resetGame()}
          className="bg-primary text-background flex h-10 w-24 items-center justify-center rounded-md font-medium hover:shadow-md sm:h-12 sm:w-32 sm:text-lg"
        >
          <span className="absolute inset-0 flex translate-x-0 items-center justify-center transition-all duration-300 group-hover:translate-x-full">
            Restart
          </span>
          <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-all duration-300 group-hover:translate-x-0 group-active:-rotate-180">
            <IconRotateClockwise size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
