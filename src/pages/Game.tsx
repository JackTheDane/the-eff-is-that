import styles from "./Game.module.scss";
import { useGameLobbyStore } from "../features/gameLobby/hooks/useGameLobbyStore";
import { PlayerCard } from "../features/player/components/PlayerCard";
import { PictureZoomerSlideShow } from "../features/slides/components/PictureZoomerSlideShow";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ROUTES } from "../routes";
import { useQuiz } from "../features/quiz/hooks/useQuiz";

export function Game() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { players } = useGameLobbyStore();
  const { data: quiz, error, isPending } = useQuiz(quizId!);

  if (isPending) {
    return <>Loading...</>;
  }

  if (error) {
    return (
      <>
        <p>Could not find a quiz matching this id... 🤔</p>
        <p>Try choosing another from the lobby list</p>
        <div>
          <Button
            variant="success"
            onClick={() => navigate(ROUTES.lobby.quizzes.route())}
          >
            ☕ Go to lobby
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PictureZoomerSlideShow slides={quiz.slides} />
      <PlayerCardContainer>
        {players.map((player) => (
          <PlayerCard playerInfo={player} status="playing" key={player.id} />
        ))}
      </PlayerCardContainer>
    </>
  );
}
