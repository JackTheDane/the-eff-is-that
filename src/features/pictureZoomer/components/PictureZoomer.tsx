import { FC } from "react";
import { Button } from "../../../components/Button";
import { useKeyboardEvent } from "../../../hooks/useKeyboardEvent";
import styles from "./PictureZoomer.module.scss";
import { ZOOM_INCREMENTS, useZoomLevel } from "../hooks/useZoomLevel";
import { Slide } from "../../slides/types";

export type PictureZoomerProps = {
  slide: Slide;
  showTitle?: boolean;
};

export const PictureZoomer: FC<PictureZoomerProps> = ({
  slide: { answer, imageSrc, centerOrigin },
  showTitle = true,
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

  return (
    <div className={styles.root}>
      {showTitle && (
        <h2>
          {zoomScale === ZOOM_INCREMENTS[0] ? answer : "What the 🦆 is that?!"}
        </h2>
      )}
      <div className={styles.pictureContainerWrapper}>
        <div className={styles.pictureContainer}>
          {imageSrc ? (
            <img
              src={imageSrc}
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: `${centerOrigin?.x ?? 50}% ${
                  centerOrigin?.y ?? 50
                }%`,
              }}
            />
          ) : (
            <span className={styles.picturePlaceholder}>(No image)</span>
          )}
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
