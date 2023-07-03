import { Avatar } from "../features/player/components/Avatar";
import { useGameLobby } from "../features/gameLobby/hooks/useGameLobby";
import styles from "./Winner.module.scss";

export const Winner = () => {
  const { players } = useGameLobby();
  const winner = [...players].sort(
    (playerA, playerB) => playerB.score - playerA.score
  )[0];

  return (
    <div className={styles.root}>
      <h1>Vinderen er...</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Avatar avatarSeed={winner.avatarSeed} isLeading />
        <h1>{winner.name}!</h1>
      </div>
    </div>
  );
};
