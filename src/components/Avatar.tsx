import React, { FC } from 'react'
import { useCombinedClasses } from '../hooks/useCombinedClasses';
import styles from './Avatar.module.scss';

type AvatarProps = {
  name: string;
  isLeading?: boolean;
}

export const Avatar: FC<AvatarProps> = ({
  name,
  isLeading
}) => {
  return (
    <div className={useCombinedClasses(styles.avatar, isLeading && styles.leading)}>
      <img src={`https://api.dicebear.com/5.x/bottts/svg?seed=${name}`} />
    </div>
  )
}
