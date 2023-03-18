import { PlayerInfo } from "./../models/PlayerInfo";
import { create } from "zustand";

type GameLobbyStore = {
  players: PlayerInfo[];
};

export const useGameLobby = create<GameLobbyStore>((set) => ({
  players: [
    {
      name: "Mille",
      score: 0,
    },
    {
      name: "Sebastian",
      score: 0,
    },
    {
      name: "Tilde",
      score: 0,
    },
    {
      name: "Mikkel",
      score: 0,
    },
  ],
}));

const setPlayerScoreDelta = (playerName: string, scoreDelta: number) =>
  useGameLobby.setState(({ players }) => ({
    players: players.map((player) =>
      player.name === playerName
        ? {
            ...player,
            score: player.score + scoreDelta,
          }
        : player
    ),
  }));

export const gameLobbyActions = {
  incrementScore(playerName: string) {
    setPlayerScoreDelta(playerName, 1);
  },
  decrementScore(playerName: string) {
    setPlayerScoreDelta(playerName, -1);
  },
};
