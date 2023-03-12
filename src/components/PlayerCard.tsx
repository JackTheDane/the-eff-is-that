import { FC, useState } from 'react'
import { Button } from './Button';
import styles from "./PlayerCard.module.scss";

type PlayerCardProps = {
  name: string;
}

export const PlayerCard: FC<PlayerCardProps> = ({
  name
}) => {
  const [score, setScore] = useState(0);

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src={`https://api.dicebear.com/5.x/bottts/svg?seed=${name}`} />
      </div>
      <h2>
        {name}
      </h2>

      <div className={styles.counter}>
        <Button theme='danger'>-</Button>
        <h2>{score}</h2>
        <Button theme='success'>+</Button>
      </div>
    </div>
  )
}
