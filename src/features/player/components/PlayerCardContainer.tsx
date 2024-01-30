import { FC, ReactNode } from "react";
import styles from "./PlayerCardContainer.module.scss";

type PlayerCardContainerProps = {
  children?: ReactNode;
};

export const PlayerCardContainer: FC<PlayerCardContainerProps> = ({
  children,
}) => {
  return <div className={styles.playerContainer}>{children}</div>;
};
