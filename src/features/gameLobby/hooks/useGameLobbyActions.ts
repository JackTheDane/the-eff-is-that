import { useQueryClient, useMutation } from "@tanstack/react-query";
import { GameLobby } from "../types";
import { GAME_LOBBY_STORE_NAME } from "../constants";
import { gameLobbyStorage } from "../storage";
import { useGameLobby } from "./useGameLobby";

export const useGameLobbyActions = () => {
  const queryClient = useQueryClient();

  const { data: gameLobby } = useGameLobby();

  const { mutate, mutateAsync, ...rest } = useMutation({
    mutationFn: async (gameLobby: GameLobby) =>
      gameLobbyStorage.set(gameLobby.id, gameLobby),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GAME_LOBBY_STORE_NAME] });
      // TODO: Investigate if I need to invalidate the quizId as well
    },
  });

  //   const setPlayerScoreDelta = (playerId: string, scoreDelta: number) =>
  //   mutate(gameLobby.({ players }) => ({
  //     players: players.map((player) =>
  //       player.id === playerId
  //         ? {
  //             ...player,
  //             score: player.score + scoreDelta,
  //           }
  //         : player
  //     ),
  //   }));

  //   const gameLobbyActions = {
  //     score: {
  //       increment(playerId: string) {
  //         setPlayerScoreDelta(playerId, 1);
  //       },
  //       decrement(playerId: string) {
  //         setPlayerScoreDelta(playerId, -1);
  //       },
  //       resetAll() {
  //         mutate(({ players }) => ({
  //           players: players.map((player) => ({
  //             ...player,
  //             score: 0,
  //           })),
  //         }));
  //       },
  //     },
  //     player: {
  //       add(playerInfo: MutablePlayerInfo) {
  //         mutate(({ players }) => ({
  //           players: [
  //             { ...playerInfo, id: generateUniqueId(), score: 0 },
  //             ...players,
  //           ],
  //         }));
  //       },
  //       delete(id: PlayerInfo["id"]) {
  //         mutate(({ players }) => ({
  //           players: players.filter((player) => player.id !== id),
  //         }));
  //       },
  //       edit(playerId: PlayerInfo["id"], updatedInfo: Partial<MutablePlayerInfo>) {
  //         mutate(({ players }) => ({
  //           players: players.map((player) =>
  //             playerId === player.id ? { ...player, ...updatedInfo } : player
  //           ),
  //         }));
  //       },
  //     },

  //   } as const;

  //   return {

  //   }
  // }
};
