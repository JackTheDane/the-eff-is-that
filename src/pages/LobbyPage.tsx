import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PlayerForm } from "../features/player/components/PlayerForm";
import styles from "./LobbyPage.module.scss";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";
import { useGameLobby } from "../features/gameLobby/hooks/useGameLobby";
import { PlayerCard } from "../features/player/components/PlayerCard";

export const LobbyPage = () => {
  const navigate = useNavigate();
  const { players } = useGameLobby();

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <Button onClick={() => navigate("/")}>👈 Back</Button>
        <Button
          variant="success"
          onClick={() => navigate("/game")}
          disabled={players.length === 0}
        >
          Start game 🚀
        </Button>
      </div>
      <div className={styles.formWrapper}>
        <PlayerForm />
      </div>
      <PlayerCardContainer>
        {players.map((player) => (
          <PlayerCard {...player} status="editing" key={player.name} />
        ))}
      </PlayerCardContainer>
    </div>
  );
};
