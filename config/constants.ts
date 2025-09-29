export type Game = {
  id: string;
  name: string;
  link: string;
  thumbnail: string;
  description: string;
};

export const GAMES: Game[] = [
  {
    id: "1",
    name: "Tic-Tac-Toe Vanish (Solo)",
    link: "tic-tac-toe-vanish-solo",
    thumbnail: "/tic-tac-toe-vanish-solo.png",
    description:
      "This is a unique twist on the classic Tic-Tac-Toe! Each player can only have a maximum of three marks on the board at any time. When a player makes their fourth move, their oldest mark vanishes, opening up new strategic possibilities.",
  },
  {
    id: "2",
    name: "Tic-Tac-Toe Vanish (1v1)",
    link: "tic-tac-toe-vanish-1v1",
    thumbnail: "/tic-tac-toe-vanish-1v1.png",
    description:
      "This is a unique twist on the classic Tic-Tac-Toe! Each player can only have a maximum of three marks on the board at any time. When a player makes their fourth move, their oldest mark vanishes, opening up new strategic possibilities.",
  },
  {
    id: "3",
    name: "Nine Men's Morris",
    link: "nine-mens-morris",
    thumbnail: "/ninemensmorris.png",
    description:
      "This is a unique twist on the classic Tic-Tac-Toe! Each player can only have a maximum of three marks on the board at any time. When a player makes their fourth move, their oldest mark vanishes, opening up new strategic possibilities.",
  },
];
