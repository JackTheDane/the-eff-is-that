import styles from "./Game.module.scss";
import { useGameLobby } from "../features/gameLobby/hooks/useGameLobby";
import { PlayerCard } from "../features/player/components/PlayerCard";
import { PictureZoomerSlideShow } from "../features/slides/components/PictureZoomerSlideShow";

export function Game() {
  const { players } = useGameLobby();

  return (
    <div className={styles.app}>
      <PictureZoomerSlideShow />
      <div className={styles.playerContainer}>
        {players.map((player) => (
          <PlayerCard {...player} status="playing" key={player.name} />
        ))}
      </div>
    </div>
  );
}
