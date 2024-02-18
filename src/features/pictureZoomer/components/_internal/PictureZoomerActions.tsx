import { Button } from "../../../../components/Button";
import { useKeyboardEvent } from "../../../../hooks/useKeyboardEvent";
import { ZOOM_INCREMENTS } from "../../constants";
import { useZoomLevel } from "../../contexts/zoomLevelContext";
import styles from "./PictureZoomerActions.module.scss";

export const PictureZoomerActions = () => {
  const { zoomLevel, zoomIn, zoomOut } = useZoomLevel() ?? {};

  useKeyboardEvent((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        zoomIn?.();
        break;

      case "ArrowDown":
        zoomOut?.();
        break;
    }
  });

  return (
    <div className={styles.actions}>
      <div className={styles.zoomActions}>
        <Button onClick={zoomOut} disabled={ZOOM_INCREMENTS[0] === zoomLevel}>
          🔍 -
        </Button>
        <h3>{zoomLevel ? zoomLevel * 100 : 100} %</h3>
        <Button
          onClick={zoomIn}
          disabled={ZOOM_INCREMENTS.at(-1) === zoomLevel}
        >
          🔍 +
        </Button>
      </div>
    </div>
  );
};
