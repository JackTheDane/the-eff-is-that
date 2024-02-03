import { ReactNode } from "react";
import styles from "./Header.module.scss";
import { useCombinedClasses } from "../hooks/useCombinedClasses";

export type HeaderProps = {
  className?: string;
  children?: ReactNode;
};

export const Header = ({ className, children }: HeaderProps) => {
  return (
    <div className={useCombinedClasses(className, styles.header)}>
      {children}
    </div>
  );
};
