import { PlayerCardProps } from "../components/PlayerCard";

export type PlayerInfo = Omit<PlayerCardProps, "setScore" | 'isLeading'>;
