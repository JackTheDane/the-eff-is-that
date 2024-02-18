import { ReactNode } from "react";
import styles from "./Header.module.scss";
import { combineClasses } from "../utils/combineClasses";

export type HeaderProps = {
  className?: string;
  children?: ReactNode;
};

export const Header = ({ className, children }: HeaderProps) => {
  return (
    <div className={combineClasses(className, styles.header)}>{children}</div>
  );
};
