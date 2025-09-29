"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Type definitions for clarity
type Player = "P1" | "P2";
type PointState = Player | null;
type GamePhase = "placing" | "moving" | "removing" | "flying" | "gameOver";

// --- Game Constants ---

// Coordinates for each of the 24 board points on a 500x500 SVG canvas
const POINT_COORDINATES = [
  { x: 50, y: 50 },
  { x: 250, y: 50 },
  { x: 450, y: 50 },
  { x: 50, y: 250 },
  { x: 450, y: 250 },
  { x: 50, y: 450 },
  { x: 250, y: 450 },
  { x: 450, y: 450 },
  { x: 150, y: 150 },
  { x: 250, y: 150 },
  { x: 350, y: 150 },
  { x: 150, y: 250 },
  { x: 350, y: 250 },
  { x: 150, y: 350 },
  { x: 250, y: 350 },
  { x: 350, y: 350 },
  { x: 200, y: 200 },
  { x: 250, y: 200 },
  { x: 300, y: 200 },
  { x: 200, y: 250 },
  { x: 300, y: 250 },
  { x: 200, y: 300 },
  { x: 250, y: 300 },
  { x: 300, y: 300 },
];

// Defines which points are adjacent to each other for the 'moving' phase
const ADJACENCIES: { [key: number]: number[] } = {
  0: [1, 3],
  1: [0, 2, 9],
  2: [1, 4],
  3: [0, 5, 11],
  4: [2, 7, 12],
  5: [3, 6],
  6: [5, 7, 14],
  7: [4, 6],
  8: [9, 11],
  9: [1, 8, 10, 17],
  10: [9, 12],
  11: [3, 8, 13, 19],
  12: [4, 10, 15, 20],
  13: [11, 14],
  14: [6, 13, 15, 22],
  15: [12, 14],
  16: [17, 19],
  17: [9, 16, 18],
  18: [17, 20],
  19: [11, 16, 21],
  20: [12, 18, 23],
  21: [19, 22],
  22: [14, 21, 23],
  23: [20, 22],
};

// All possible 3-in-a-row combinations (mills)
const MILLS = [
  [0, 1, 2],
  [5, 6, 7],
  [8, 9, 10],
  [13, 14, 15],
  [16, 17, 18],
  [21, 22, 23],
  [0, 3, 5],
  [2, 4, 7],
  [8, 11, 13],
  [10, 12, 15],
  [16, 19, 21],
  [18, 20, 23],
  [1, 9, 17],
  [6, 14, 22],
  [3, 11, 19],
  [4, 12, 20],
];

const INITIAL_PIECES = 9;

// --- Sub-components ---

const PlayerInfo: React.FC<{
  player: Player;
  name: string;
  piecesToPlace: number;
  piecesOnBoard: number;
  isActive: boolean;
}> = ({ player, name, piecesToPlace, piecesOnBoard, isActive }) => {
  const color = player === "P1" ? "bg-blue-500" : "bg-red-500";

  return (
    <div
      className={`rounded-lg p-4 shadow-lg transition-all duration-300 ${isActive ? "ring-2 ring-neutral-400" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{name}</h2>
        <div className={`h-6 w-6 rounded-full ${color}`}></div>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p>
          Pieces in hand:{" "}
          <span className="text-lg font-semibold">{piecesToPlace}</span>
        </p>
        <p>
          Pieces on board:{" "}
          <span className="text-lg font-semibold">{piecesOnBoard}</span>
        </p>
      </div>
    </div>
  );
};

const GameStatus: React.FC<{ message: string; phase: GamePhase }> = ({
  message,
  phase,
}) => (
  <div className="flex min-h-[5rem] items-center justify-center p-3 text-center">
    <p
      className={`text-lg font-semibold transition-opacity duration-300 ${phase === "gameOver" ? "text-green-400" : "text-neutral-800"}`}
    >
      {message}
    </p>
  </div>
);

const GamePiece: React.FC<{ player: Player }> = ({ player }) => (
  <motion.div
    layoutId={`piece-${Math.random()}`} // Unique ID for layout animation
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    className={`h-8 w-8 rounded-full shadow-lg md:h-10 md:w-10 ${player === "P1" ? "bg-blue-500" : "bg-red-500"}`}
  />
);

const BoardPoint: React.FC<{
  index: number;
  state: PointState;
  onClick: (index: number) => void;
  isSelectable: boolean;
  isSelected: boolean;
}> = ({ index, state, onClick, isSelectable, isSelected }) => {
  const { x, y } = POINT_COORDINATES[index];

  return (
    <g transform={`translate(${x}, ${y})`} onClick={() => onClick(index)}>
      <motion.circle
        cx="0"
        cy="0"
        r="25"
        fill="transparent"
        className={isSelectable ? "cursor-pointer" : "cursor-default"}
      />
      <motion.circle
        cx="0"
        cy="0"
        r="10"
        fill="#4A5568"
        stroke={isSelected ? "#FBBF24" : "#718096"}
        strokeWidth={isSelected ? 4 : 2}
        whileHover={isSelectable ? { scale: 1.5 } : {}}
      />
      <AnimatePresence>
        {state && (
          <foreignObject x="-20" y="-20" width="40" height="40">
            <GamePiece player={state} />
          </foreignObject>
        )}
      </AnimatePresence>
    </g>
  );
};

// --- Main Game Component ---

const NineMensMorris = () => {
  const [board, setBoard] = useState<PointState[]>(Array(24).fill(null));
  const [phase, setPhase] = useState<GamePhase>("placing");
  const [currentPlayer, setCurrentPlayer] = useState<Player>("P1");
  const [p1PiecesToPlace, setP1PiecesToPlace] = useState(INITIAL_PIECES);
  const [p2PiecesToPlace, setP2PiecesToPlace] = useState(INITIAL_PIECES);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [message, setMessage] = useState("Player 1's turn to place a piece.");
  const [winner, setWinner] = useState<Player | null>(null);

  const p1PiecesOnBoard = board.filter((p) => p === "P1").length;
  const p2PiecesOnBoard = board.filter((p) => p === "P2").length;

  const resetGame = useCallback(() => {
    setBoard(Array(24).fill(null));
    setPhase("placing");
    setCurrentPlayer("P1");
    setP1PiecesToPlace(INITIAL_PIECES);
    setP2PiecesToPlace(INITIAL_PIECES);
    setSelectedPiece(null);
    setMessage("Player 1's turn to place a piece.");
    setWinner(null);
  }, []);

  const checkForMill = useCallback(
    (newBoard: PointState[], pointIndex: number): boolean => {
      const player = newBoard[pointIndex];
      if (!player) return false;

      return MILLS.some(
        (mill) =>
          mill.includes(pointIndex) && mill.every((p) => newBoard[p] === player)
      );
    },
    []
  );

  const canRemove = useCallback(
    (player: Player, boardState: PointState[]): boolean => {
      const opponent = player === "P1" ? "P2" : "P1";
      const opponentPieces = boardState
        .map((p, i) => (p === opponent ? i : -1))
        .filter((i) => i !== -1);

      const opponentPiecesInMills = opponentPieces.filter((i) =>
        MILLS.some(
          (mill) =>
            mill.includes(i) && mill.every((p) => boardState[p] === opponent)
        )
      );

      return opponentPieces.length > opponentPiecesInMills.length;
    },
    []
  );

  const checkForWin = useCallback(
    (currentBoard: PointState[], playerToCheck: Player) => {
      const allPiecesPlaced = p1PiecesToPlace === 0 && p2PiecesToPlace === 0;
      if (!allPiecesPlaced) return false;

      const opponent = playerToCheck;
      const opponentPiecesCount = currentBoard.filter(
        (p) => p === opponent
      ).length;

      // Win Condition 1: Opponent has less than 3 pieces.
      if (opponentPiecesCount < 3) return true;

      // Win Condition 2: Opponent has no legal moves.
      const opponentIsFlying = opponentPiecesCount === 3;
      if (opponentIsFlying) return false; // Player with 3 pieces can fly, so they can't be blocked.

      const opponentPiecesIndexes = currentBoard
        .map((p, i) => (p === opponent ? i : -1))
        .filter((i) => i !== -1);
      const canMove = opponentPiecesIndexes.some((index) => {
        return ADJACENCIES[index].some((adj) => currentBoard[adj] === null);
      });

      return !canMove;
    },
    [p1PiecesToPlace, p2PiecesToPlace]
  );

  const switchPlayer = useCallback(() => {
    const nextPlayer = currentPlayer === "P1" ? "P2" : "P1";
    setCurrentPlayer(nextPlayer);

    if (phase === "gameOver") return;

    // Determine the correct phase for the *next* player
    let newPhase: GamePhase;
    const allPiecesPlaced =
      (nextPlayer === "P1" ? p1PiecesToPlace : p2PiecesToPlace) === 0 &&
      (nextPlayer === "P2" ? p2PiecesToPlace : p1PiecesToPlace) === 0;

    if (!allPiecesPlaced) {
      newPhase = "placing";
    } else {
      const nextPlayerPieceCount = board.filter((p) => p === nextPlayer).length;
      newPhase = nextPlayerPieceCount === 3 ? "flying" : "moving";
    }

    setPhase(newPhase);
    const action =
      newPhase === "placing" ? "place" : newPhase === "flying" ? "fly" : "move";
    setMessage(
      `Player ${nextPlayer === "P1" ? "1" : "2"}'s turn to ${action}.`
    );
  }, [currentPlayer, board, phase, p1PiecesToPlace, p2PiecesToPlace]);

  const handlePointClick = (index: number) => {
    if (winner) return;

    if (phase === "removing") handleRemovePiece(index);
    else if (phase === "placing") handlePlacePiece(index);
    else if (phase === "moving" || phase === "flying") handleMovePiece(index);
  };

  const handlePlacePiece = (index: number) => {
    if (board[index] !== null) {
      setMessage("Position already taken. Try another.");

      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (currentPlayer === "P1") setP1PiecesToPlace((p) => p - 1);
    else setP2PiecesToPlace((p) => p - 1);

    if (checkForMill(newBoard, index)) {
      setPhase("removing");
      setMessage(
        `Player ${currentPlayer === "P1" ? "1" : "2"} formed a mill! Remove an opponent's piece.`
      );
    } else {
      switchPlayer();
    }
  };

  const handleRemovePiece = (index: number) => {
    const opponent = currentPlayer === "P1" ? "P2" : "P1";
    if (board[index] !== opponent) {
      setMessage("You must remove an opponent's piece.");

      return;
    }

    const isPieceInMill = MILLS.some(
      (mill) => mill.includes(index) && mill.every((p) => board[p] === opponent)
    );
    if (isPieceInMill && canRemove(currentPlayer, board)) {
      setMessage(
        "Cannot remove a piece from a mill unless other pieces are available."
      );

      return;
    }

    const newBoard = [...board];
    newBoard[index] = null;

    if (checkForWin(newBoard, opponent)) {
      setWinner(currentPlayer);
      setPhase("gameOver");
      setMessage(`Player ${currentPlayer === "P1" ? 1 : 2} wins!`);
    } else {
      switchPlayer();
    }
    setBoard(newBoard);
  };

  const handleMovePiece = (index: number) => {
    if (selectedPiece === null) {
      if (board[index] === currentPlayer) {
        setSelectedPiece(index);
        setMessage("Selected piece. Click an empty spot to move.");
      } else {
        setMessage("Select one of your own pieces to move.");
      }
    } else {
      if (index === selectedPiece) {
        setSelectedPiece(null);
        const action = phase === "flying" ? "fly" : "move";
        setMessage(
          `Player ${currentPlayer === "P1" ? "1" : "2"}'s turn to ${action}.`
        );

        return;
      }

      const isFlying = phase === "flying";
      const isValidMove =
        isFlying || ADJACENCIES[selectedPiece].includes(index);

      if (board[index] === null && isValidMove) {
        const newBoard = [...board];
        newBoard[selectedPiece] = null;
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setSelectedPiece(null);

        if (checkForMill(newBoard, index)) {
          setPhase("removing");
          setMessage(
            `Player ${currentPlayer === "P1" ? "1" : "2"} formed a mill! Remove an opponent's piece.`
          );
        } else {
          const opponent = currentPlayer === "P1" ? "P2" : "P1";
          if (checkForWin(newBoard, opponent)) {
            setWinner(currentPlayer);
            setPhase("gameOver");
            setMessage(`Player ${currentPlayer === "P1" ? 1 : 2} wins!`);
          } else {
            switchPlayer();
          }
        }
      } else {
        setMessage("Invalid move. Try an empty, connected spot.");
      }
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center p-4">
      <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-3">
        <PlayerInfo
          player="P1"
          name="Player 1"
          piecesToPlace={p1PiecesToPlace}
          piecesOnBoard={p1PiecesOnBoard}
          isActive={currentPlayer === "P1" && !winner}
        />
        <div className="order-first md:order-none">
          <GameStatus message={message} phase={phase} />
        </div>
        <PlayerInfo
          player="P2"
          name="Player 2"
          piecesToPlace={p2PiecesToPlace}
          piecesOnBoard={p2PiecesOnBoard}
          isActive={currentPlayer === "P2" && !winner}
        />
      </div>

      <div className="relative my-6 aspect-square w-full max-w-[500px]">
        <svg viewBox="0 0 500 500">
          {/* Board Lines */}
          <path
            d="M50,50 H450 V450 H50 Z"
            stroke="#718096"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M150,150 H350 V350 H150 Z"
            stroke="#718096"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M200,200 H300 V300 H200 Z"
            stroke="#718096"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M250,50 V200 M250,450 V300 M50,250 H200 M450,250 H300"
            stroke="#718096"
            strokeWidth="4"
            fill="none"
          />

          {board.map((pointState, index) => {
            const isPlayerPiece = pointState === currentPlayer;
            const isOpponentPiece = pointState && pointState !== currentPlayer;
            let isSelectable = false;

            if (phase === "placing" && pointState === null) isSelectable = true;
            if (
              (phase === "moving" || phase === "flying") &&
              selectedPiece === null &&
              isPlayerPiece
            )
              isSelectable = true;
            if (
              (phase === "moving" || phase === "flying") &&
              selectedPiece !== null &&
              pointState === null
            )
              isSelectable = true;
            if (phase === "removing" && isOpponentPiece) isSelectable = true;

            return (
              <BoardPoint
                key={index}
                index={index}
                state={pointState}
                onClick={handlePointClick}
                isSelectable={!winner && isSelectable}
                isSelected={selectedPiece === index}
              />
            );
          })}
        </svg>
      </div>

      <InteractiveHoverButton onClick={resetGame}>Reset</InteractiveHoverButton>
    </div>
  );
};

export default NineMensMorris;
