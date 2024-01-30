import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PlayerForm } from "../features/player/components/PlayerForm";
import styles from "./LobbyPage.module.scss";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";
import {
  gameLobbyActions,
  useGameLobby,
} from "../features/gameLobby/hooks/useGameLobby";
import { PlayerCard } from "../features/player/components/PlayerCard";
import { ROUTES } from "../routes";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const { players } = useGameLobby();

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <Button onClick={() => navigate(ROUTES.home)}>👈 Back</Button>
        <Button
          variant="success"
          onClick={() => navigate(ROUTES.game.route(0))}
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
            gameLobbyActions.player.add({ ...newPlayerInfo })
          }
        />
      </div>
      <PlayerCardContainer>
        {players.map((player) => (
          <PlayerCard playerInfo={player} status="display" key={player.id} />
        ))}
      </PlayerCardContainer>
    </div>
  );
};
