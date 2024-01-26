import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { PlayerForm } from "../features/player/components/PlayerForm";
import styles from "./LobbyPage.module.scss";
import { PlayerCardContainer } from "../features/player/components/PlayerCardContainer";

export const LobbyPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.lobby}>
      <div className={styles.header}>
        <Button onClick={() => navigate("/")}>👈 Back</Button>
        <Button variant="success" onClick={() => navigate("/game")}>
          🚀 Start game
        </Button>
      </div>
      <div className={styles.formWrapper}>
        <PlayerForm />
      </div>
      <PlayerCardContainer status="editing" />
    </div>
  );
};
