import { FC, useEffect, useState } from "react";
import { Counter } from "../../../components/Counter";
import {
  useGameLobbyStore,
  gameLobbyStoreActions,
} from "../../gameLobby/hooks/useGameLobbyStore";
import { PlayerInfo } from "../models/PlayerInfo";
import { Avatar } from "../../avatar/components/Avatar";
import styles from "./PlayerCard.module.scss";
import { PlayerForm } from "./PlayerForm";
import { Button } from "../../../components/Button";

export type PlayerCardProps = {
  playerInfo: PlayerInfo;
  status?: "playing" | "editing" | "display";
  hideControls?: boolean;
};

export const PlayerCard: FC<PlayerCardProps> = ({
  playerInfo,
  status: initialStatus = "display",
  hideControls = false,
}) => {
  const { id, name, score, avatarSeed } = playerInfo;
  const { players } = useGameLobbyStore();
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const isLeading =
    (status === "playing" || status === "display") &&
    score > 0 &&
    players.every((otherPlayer) => score >= otherPlayer.score);

  const onDeletePlayerClicked = () => {
    if (window.confirm(`Delete player ${playerInfo.name}?`)) {
      gameLobbyStoreActions.player.delete(playerInfo.id);
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
            gameLobbyStoreActions.player.edit(id, { ...newPlayerInfo });
            setStatus(initialStatus);
          }}
          submitButtonProps={{ children: "💾 Save" }}
          cancelButtonProps={{
            children: "❌ Cancel",
            onClick: () => setStatus(initialStatus),
          }}
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

        {status === "display" && !hideControls && (
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
            onDecrement={() => gameLobbyStoreActions.score.decrement(id)}
            onIncrement={() => gameLobbyStoreActions.score.increment(id)}
          />
        )}
      </>
    );
  };

  return <div className={styles.card}>{renderCardContent()}</div>;
};
