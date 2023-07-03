import { PlayerInfo } from "../../player/models/PlayerInfo";
import { create } from "zustand";

type GameLobbyStore = {
  players: PlayerInfo[];
};

type MutablePlayerInfo = Omit<PlayerInfo, "id" | "score">;

export const useGameLobby = create<GameLobbyStore>((set) => ({
  players: [],
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
  score: {
    increment(playerName: string) {
      setPlayerScoreDelta(playerName, 1);
    },
    decrement(playerName: string) {
      setPlayerScoreDelta(playerName, -1);
    },
  },
  player: {
    add(playerInfo: MutablePlayerInfo) {
      useGameLobby.setState(({ players }) => ({
        players: [
          { ...playerInfo, id: crypto.randomUUID(), score: 0 },
          ...players,
        ],
      }));
    },
    delete(id: PlayerInfo["id"]) {
      useGameLobby.setState(({ players }) => ({
        players: players.filter(({ name }) => name !== id),
      }));
    },
    edit(playerId: PlayerInfo["id"], updatedInfo: Partial<MutablePlayerInfo>) {
      useGameLobby.setState(({ players }) => ({
        players: players.map((player) =>
          updatedInfo.name === player.name
            ? { ...player, ...updatedInfo }
            : player
        ),
      }));
    },
  },
};
