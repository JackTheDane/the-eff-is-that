import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Avatar } from "../features/avatar/components/Avatar";
import { useGameLobbyStore } from "../features/gameLobby/hooks/useGameLobbyStore";
import { PlayerCard } from "../features/player/components/PlayerCard";
import styles from "./Winner.module.scss";
import { PlayerInfo } from "../features/player/models/PlayerInfo";
import { ROUTES } from "../routes";

export const Winner = () => {
  const navigate = useNavigate();

  const { players } = useGameLobbyStore();
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

  if (!winners?.length) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return (
    <div className={styles.root}>
      <Button size="large" onClick={() => navigate(-1)}>
        👈 Back to game
      </Button>
      <h1 style={{ fontStyle: "italic", fontWeight: 300 }}>Winner winner</h1>
      {winners.map((winner) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          key={winner.id}
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
          <PlayerCard playerInfo={player} key={player.id} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Button
          size="large"
          variant="success"
          onClick={() => navigate(ROUTES.lobby)}
        >
          🔁 Play again?
        </Button>
        <Button onClick={() => navigate(ROUTES.home)}>
          🏠 Go to front page
        </Button>
      </div>
    </div>
  );
};
