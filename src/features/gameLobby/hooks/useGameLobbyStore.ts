import { generateUniqueId } from "../../id/utils/generateUniqueId";
import { PlayerInfo } from "../../player/models/PlayerInfo";
import { create } from "zustand";

type GameLobbyStore = {
  players: PlayerInfo[];
};

type MutablePlayerInfo = Omit<PlayerInfo, "id" | "score">;

export const useGameLobbyStore = create<GameLobbyStore>((set) => ({
  players: [],
}));

const setPlayerScoreDelta = (playerId: string, scoreDelta: number) =>
  useGameLobbyStore.setState(({ players }) => ({
    players: players.map((player) =>
      player.id === playerId
        ? {
            ...player,
            score: player.score + scoreDelta,
          }
        : player
    ),
  }));

export const gameLobbyStoreActions = {
  score: {
    increment(playerId: string) {
      setPlayerScoreDelta(playerId, 1);
    },
    decrement(playerId: string) {
      setPlayerScoreDelta(playerId, -1);
    },
    resetAll() {
      useGameLobbyStore.setState(({ players }) => ({
        players: players.map((player) => ({
          ...player,
          score: 0,
        })),
      }));
    },
  },
  player: {
    add(playerInfo: MutablePlayerInfo) {
      useGameLobbyStore.setState(({ players }) => ({
        players: [
          { ...playerInfo, id: generateUniqueId(), score: 0 },
          ...players,
        ],
      }));
    },
    delete(id: PlayerInfo["id"]) {
      useGameLobbyStore.setState(({ players }) => ({
        players: players.filter((player) => player.id !== id),
      }));
    },
    edit(playerId: PlayerInfo["id"], updatedInfo: Partial<MutablePlayerInfo>) {
      useGameLobbyStore.setState(({ players }) => ({
        players: players.map((player) =>
          playerId === player.id ? { ...player, ...updatedInfo } : player
        ),
      }));
    },
  },
};
