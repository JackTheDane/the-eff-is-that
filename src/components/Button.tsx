import React, { FC } from 'react'
import { useCombinedClasses } from '../hooks/useCombinedClasses'
import styles from "./Button.module.scss";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  size?: 'medium' | 'large'
}

export const Button: FC<ButtonProps> = ({
  className,
  size = 'medium',
  style,
  ...props
}) => {

  const fontSize = size === 'medium' ? 18 : 24;

  return (
    <button {...props} className={useCombinedClasses(className, styles.root)} style={{
      ...style,
      fontSize
    }}></button>
  )
}
