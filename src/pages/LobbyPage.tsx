import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { PlayerForm } from "../features/player/components/PlayerForm";
import styles from "./LobbyPage.module.scss";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";
import {
  gameLobbyStoreActions,
  useGameLobbyStore,
} from "../features/gameLobby/hooks/useGameLobbyStore";
import { PlayerCard } from "../features/player/components/PlayerCard";
import { ROUTES } from "../routes";
import { ResetAllScoresButton } from "../features/gameLobby/components/ResetAllScoresButton";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const { players } = useGameLobbyStore();

  const quizId = "123";

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <Button onClick={() => navigate(ROUTES.home)}>👈 Back</Button>
        <Button
          variant="success"
          onClick={() => navigate(ROUTES.quiz.play.route(quizId, 0))}
          disabled={players.length === 0}
        >
          Start game 🚀
        </Button>
      </div>
      <div className={styles.formWrapper}>
        <PlayerForm
          submitButtonProps={{ children: "+ Add" }}
          resetOnSubmit
          onSubmit={(newPlayerInfo) =>
            gameLobbyStoreActions.player.add({ ...newPlayerInfo })
          }
        />
      </div>

      <ResetAllScoresButton />

      <PlayerCardContainer>
        {players.map((player) => (
          <PlayerCard playerInfo={player} status="display" key={player.id} />
        ))}
      </PlayerCardContainer>
    </div>
  );
};
