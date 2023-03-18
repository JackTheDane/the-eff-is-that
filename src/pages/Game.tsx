import { useState } from "react";
import styles from "./Game.module.scss";
import { PictureZoomerSlideShow } from "../components/PictureZoomerSlideShow";
import { PlayerCard, PlayerCardProps } from "../components/PlayerCard";
import { useGameLobby } from "../hooks/useGameLobby";

export function Game() {
  const { players } = useGameLobby();

  return (
    <div className={styles.app}>
      <PictureZoomerSlideShow />
      <div className={styles.playerContainer}>
        {players.map((player) => (
          <PlayerCard {...player} key={player.name} />
        ))}
      </div>
    </div>
  );
}
