import { FC, useEffect, useState } from "react";
import { Counter } from "../../../components/Counter";
import {
  useGameLobby,
  gameLobbyActions,
} from "../../gameLobby/hooks/useGameLobby";
import { PlayerInfo } from "../models/PlayerInfo";
import { Avatar } from "../../avatar/components/Avatar";
import styles from "./PlayerCard.module.scss";
import { PlayerForm } from "./PlayerForm";
import { Button } from "../../../components/Button";

export type PlayerCardProps = {
  playerInfo: PlayerInfo;
  status?: "playing" | "editing" | "display";
};

export const PlayerCard: FC<PlayerCardProps> = ({
  playerInfo,
  status: initialStatus = "display",
}) => {
  const { id, name, score, avatarSeed } = playerInfo;
  const { players } = useGameLobby();
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const isLeading =
    status === "playing" &&
    score > 0 &&
    players.every((otherPlayer) => score >= otherPlayer.score);

  const onDeletePlayerClicked = () => {
    if (window.confirm(`Delete player ${playerInfo.name}?`)) {
      gameLobbyActions.player.delete(playerInfo.id);
    }
  };

  const renderCardContent = () => {
    if (status === "editing") {
      return (
        <PlayerForm
          className={styles.editForm}
          playerInfo={playerInfo}
          onSubmit={(newPlayerInfo) => {
            console.log(newPlayerInfo);
            gameLobbyActions.player.edit(id, { ...newPlayerInfo });
            setStatus(initialStatus);
          }}
          submitButtonProps={{ children: "💾 Save" }}
          cancelButtonProps={{ children: "❌ Cancel" }}
        />
      );
    }

    return (
      <>
        <Avatar avatarSeed={avatarSeed} isLeading={isLeading} />
        <div>
          <h2>{name}</h2>
          {status === "display" && (
            <h3
              style={{
                textAlign: "center",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {score} {Math.abs(score) === 1 ? "point" : "points"}
            </h3>
          )}
        </div>

        {status === "display" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginLeft: "auto",
            }}
          >
            <Button onClick={() => setStatus("editing")}>🎩 Edit</Button>
            <Button onClick={() => onDeletePlayerClicked()}>💀 Remove</Button>
          </div>
        )}

        {status === "playing" && (
          <Counter
            count={score}
            onDecrement={() => gameLobbyActions.score.decrement(name)}
            onIncrement={() => gameLobbyActions.score.increment(name)}
          />
        )}
      </>
    );
  };

  return <div className={styles.card}>{renderCardContent()}</div>;
};
