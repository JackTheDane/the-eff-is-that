import { FunctionComponent } from "react";
import { gameLobbyActions } from "../features/gameLobby/hooks/useGameLobby";
import { Button } from "./Button";
import styles from "./Counter.module.scss";

export type CounterProps = {
  count: number;
  onDecrement(): void;
  onIncrement(): void;
};

export const Counter: FunctionComponent<CounterProps> = ({
  count,
  onDecrement,
  onIncrement,
}) => {
  return (
    <div className={styles.counter}>
      <Button variant="danger" onClick={() => onDecrement()}>
        -
      </Button>
      <h3>{count}</h3>
      <Button variant="success" onClick={() => onIncrement()}>
        +
      </Button>
    </div>
  );
};
