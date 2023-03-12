import { useState } from 'react'
import styles from './App.module.scss';
import { PictureZoomerSlideShow } from './components/PictureZoomerSlideShow'
import { PlayerCard } from './components/PlayerCard';

const players = [
  'Mille',
  'Sebastian',
  'Tilde',
  'Mikkel'
]

function App() {
  const [count, setCount] = useState(0)

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

export default App
