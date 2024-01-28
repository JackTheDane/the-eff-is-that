import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Avatar } from "../features/avatar/components/Avatar";
import { useGameLobby } from "../features/gameLobby/hooks/useGameLobby";
import { PlayerCard } from "../features/player/components/PlayerCard";
import styles from "./Winner.module.scss";
import { PlayerInfo } from "../features/player/models/PlayerInfo";

export const Winner = () => {
  const navigate = useNavigate();

  const { players } = useGameLobby();
  const [winners, ...runnerUps] = [...players]
    .sort((playerA, playerB) => playerB.score - playerA.score)
    .reduce((map, player) => {
      if (!map.has(player.score)) {
        map.set(player.score, []);
      }

      map.get(player.score)?.push(player);

      return map;
    }, new Map<number, PlayerInfo[]>())
    .values();

  if (winners.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.root}>
      <h1 style={{ fontStyle: "italic", fontWeight: 300 }}>Winner winner</h1>
      {winners.map((winner) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Avatar avatarSeed={winner.avatarSeed} isLeading />
          <div>
            <h1>{winner.name}!</h1>
            <h2
              style={{
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {winner.score} {Math.abs(winner.score) === 1 ? "point" : "points"}
            </h2>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {runnerUps.flat().flatMap((player) => (
          <PlayerCard {...player} />
        ))}
      </div>
      <Button size="large" variant="success" onClick={() => navigate("/lobby")}>
        🔁 Play again?
      </Button>
    </div>
  );
};
