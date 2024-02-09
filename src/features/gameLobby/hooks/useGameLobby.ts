import { useQuery } from "@tanstack/react-query";
import {
  GAME_LOBBY_STORE_NAME,
  TEMPORARY_GAME_LOBBY_STORAGE_ID,
} from "../constants";
import { gameLobbyStorage } from "../storage";

export const useGameLobby = (gameLobbyId = TEMPORARY_GAME_LOBBY_STORAGE_ID) =>
  useQuery({
    queryKey: [GAME_LOBBY_STORE_NAME, gameLobbyId],
    queryFn: async () => gameLobbyStorage.get(gameLobbyId),
  });
