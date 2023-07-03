import { FC } from "react";
import { Button } from "../../../components/Button";
import { useCombinedClasses } from "../../../hooks/useCombinedClasses";
import { PlayerInfo } from "../models/PlayerInfo";
import styles from "./Avatar.module.scss";

type AvatarProps = Pick<PlayerInfo, "avatarSeed"> & {
  isLeading?: boolean;
  onRegenerateClick?: (newSeed: string) => void;
};

export const Avatar: FC<AvatarProps> = ({
  avatarSeed,
  isLeading,
  onRegenerateClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={useCombinedClasses(
          styles.avatar,
          isLeading && styles.leading
        )}
      >
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${avatarSeed}`}
        />
      </div>

      {onRegenerateClick && (
        <Button onClick={() => onRegenerateClick(Math.random().toString())}>
          🔁
        </Button>
      )}
    </div>
  );
};
