import { FC, useState } from 'react'
import { Avatar } from './Avatar';
import { Button } from './Button';
import styles from "./PlayerCard.module.scss";

type PlayerCardProps = {
  name: string;
  isLeading?: boolean;
}

export const PlayerCard: FC<PlayerCardProps> = ({
  name,
  isLeading
}) => {
  const [score, setScore] = useState(0);

  return (
    <div className={styles.card}>
      <Avatar name={name} isLeading={isLeading} />
      <h2>
        {name}
      </h2>

      <div className={styles.counter}>
        <Button theme='danger' onClick={() => setScore(oldScore => oldScore-1)}>-</Button>
        <h2>{score}</h2>
        <Button theme='success' onClick={() => setScore(oldScore => oldScore+1)}>+</Button>
      </div>
    </div>
  )
}
