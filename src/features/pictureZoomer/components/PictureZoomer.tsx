import { FC } from "react";
import { Button } from "../../../components/Button";
import { useKeyboardEvent } from "../../../hooks/useKeyboardEvent";
import styles from "./PictureZoomer.module.scss";
import { ZOOM_INCREMENTS, useZoomLevel } from "../hooks/useZoomLevel";
import { Slide } from "../../slides/types";

export type PictureZoomerProps = {
  slide: Slide;
};

export const PictureZoomer: FC<PictureZoomerProps> = ({
  slide: { answer, imageSrc, centerOrigin },
}) => {
  const { zoomIn, zoomOut, zoomScale } = useZoomLevel();

  useKeyboardEvent((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        zoomIn();
        break;

      case "ArrowDown":
        zoomOut();
        break;
    }
  });

  const title =
    zoomScale === ZOOM_INCREMENTS[0] ? answer : "What the f*ck is that?!";

  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      <div className={styles.pictureContainerWrapper}>
        <div className={styles.pictureContainer}>
          <img
            src={imageSrc}
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: `${centerOrigin?.x ?? 50}% ${
                centerOrigin?.y ?? 50
              }%`,
            }}
          />
        </div>
        <div className={styles.options}>
          <div className={styles.zoomOptions}>
            <Button
              onClick={zoomOut}
              disabled={ZOOM_INCREMENTS[0] === zoomScale}
            >
              🔍 -
            </Button>
            <h3>{zoomScale * 100} %</h3>
            <Button
              onClick={zoomIn}
              disabled={ZOOM_INCREMENTS.at(-1) === zoomScale}
            >
              🔍 +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
