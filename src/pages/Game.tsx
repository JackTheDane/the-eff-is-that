import styles from "./Game.module.scss";
import { useGameLobby } from "../features/gameLobby/hooks/useGameLobby";
import { PlayerCard } from "../features/player/components/PlayerCard";
import { PictureZoomerSlideShow } from "../features/slides/components/PictureZoomerSlideShow";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";

export function Game() {
  const { players } = useGameLobby();

  return (
    <div className={styles.app}>
      <PictureZoomerSlideShow />
      <PlayerCardContainer>
        {players.map((player) => (
          <PlayerCard playerInfo={player} status="playing" key={player.id} />
        ))}
      </PlayerCardContainer>
    </div>
  );
}
