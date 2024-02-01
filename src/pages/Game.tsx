import styles from "./Game.module.scss";
import { useGameLobbyStore } from "../features/gameLobby/hooks/useGameLobbyStore";
import { PlayerCard } from "../features/player/components/PlayerCard";
import { PictureZoomerSlideShow } from "../features/slides/components/PictureZoomerSlideShow";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";
import { useQuizzesStore } from "../features/quiz/hooks/useQuizzesStore";

export function Game() {
  const { players } = useGameLobbyStore();
  const { quizzes } = useQuizzesStore();

  return (
    <div className={styles.app}>
      <PictureZoomerSlideShow slides={quizzes[0].slides} />
      <PlayerCardContainer>
        {players.map((player) => (
          <PlayerCard playerInfo={player} status="playing" key={player.id} />
        ))}
      </PlayerCardContainer>
    </div>
  );
}
