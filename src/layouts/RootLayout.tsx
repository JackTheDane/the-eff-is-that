import styles from "./RootLayout.module.scss";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};
