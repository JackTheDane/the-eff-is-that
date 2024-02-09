import { PlayerInfo } from "../player/models/PlayerInfo";

export type GameLobby = {
  id: string;
  players: PlayerInfo[];
};
