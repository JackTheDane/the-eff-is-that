import { useState } from 'react'
import styles from './Game.module.scss';
import { PictureZoomerSlideShow } from '../components/PictureZoomerSlideShow'
import { PlayerCard } from '../components/PlayerCard';

const players = [
  'Mille',
  'Sebastian',
  'Tilde',
  'Mikkel'
]

export function Game() {
  return (
    <div className={styles.app}>
      <PictureZoomerSlideShow />
      <div className={styles.playerContainer}>
        {players.map(player => (
          <PlayerCard name={player} key={player} />
        ))}
      </div>
    </div>
  )
}
