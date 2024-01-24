import { FC } from "react";
import { useGameLobby } from "../../gameLobby/hooks/useGameLobby";
import { PlayerCard, PlayerCardProps } from "./PlayerCard";
import styles from "./PlayerCardContainer.module.scss";

type PlayerCardContainerProps = Pick<PlayerCardProps, "status">;

export const PlayerCardContainer: FC<PlayerCardContainerProps> = ({
  status,
}) => {
  const { players } = useGameLobby();

  return (
    <div className={styles.playerContainer}>
      {players.map((player) => (
        <PlayerCard {...player} status={status} key={player.name} />
      ))}
    </div>
  );
};
