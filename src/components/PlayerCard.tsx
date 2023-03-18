import { FC, useState } from "react";
import { gameLobbyActions, useGameLobby } from "../hooks/useGameLobby";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import styles from "./PlayerCard.module.scss";

export type PlayerCardProps = {
  name: string;
  score: number;
  // setScore(newScore: number): void;
  // isLeading?: boolean;
};

export const PlayerCard: FC<PlayerCardProps> = ({
  name,
  score,
  // setScore,
  // isLeading
}) => {
  const { players } = useGameLobby();
  const isLeading =
    score > 0 && players.every((otherPlayer) => score >= otherPlayer.score);

  return (
    <div className={styles.card}>
      <Avatar name={name} isLeading={isLeading} />
      <h2>{name}</h2>

      <div className={styles.counter}>
        <Button
          theme="danger"
          onClick={() => gameLobbyActions.decrementScore(name)}
        >
          -
        </Button>
        <h2>{score}</h2>
        <Button
          theme="success"
          onClick={() => gameLobbyActions.incrementScore(name)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
