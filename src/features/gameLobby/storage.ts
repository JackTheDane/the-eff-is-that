import { openDB } from "idb";
import { getDbActions } from "../storage/utils/getDbActions";
import { INDEXED_DB_NAME } from "../storage/constants";
import { GAME_LOBBY_STORE_NAME } from "./constants";
import { GameLobby } from "./types";

const dbPromise = openDB(INDEXED_DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(GAME_LOBBY_STORE_NAME);
  },
});

export const gameLobbyStorage = getDbActions<GameLobby["id"], GameLobby>(
  dbPromise,
  GAME_LOBBY_STORE_NAME
);
