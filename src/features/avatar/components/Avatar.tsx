import { FC } from "react";
import { useCombinedClasses } from "../../../hooks/useCombinedClasses";
import { PlayerInfo } from "../../player/models/PlayerInfo";
import styles from "./Avatar.module.scss";
import { getAvatarImageUrl } from "../utils/getAvatarImageUrl";

type AvatarProps = Pick<PlayerInfo, "avatarSeed"> & {
  isLeading?: boolean;
  className?: string;
};

export const Avatar: FC<AvatarProps> = ({
  avatarSeed,
  isLeading,
  className,
}) => {
  return (
    <div className={useCombinedClasses(className, styles.wrapper)}>
      <div
        className={useCombinedClasses(
          styles.avatar,
          isLeading && styles.leading
        )}
      >
        <img src={getAvatarImageUrl(avatarSeed)} />
      </div>
    </div>
  );
};
