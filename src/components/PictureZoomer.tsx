import { FC, useState } from "react";
import { useKeyboardEvent } from "../hooks/useKeyboardEvent";
import { Button } from "./Button";
import styles from "./PictureZoomer.module.scss";

export type PictureZoomerProps = {
  name: string;
  src: string;
  transformCenter?: {
    x: number;
    y: number;
  };
};

const ZOOM_FACTOR = 100;

const zoomIncrements = [100, 150, 200, 250, 350, 500, 800, 1200, 1600, 2500];

const maxZoomStepIndex = zoomIncrements.length - 1;

export const PictureZoomer: FC<PictureZoomerProps> = ({
  name,
  src,
  transformCenter,
}) => {
  const [zoomIndex, setZoomIndex] = useState(maxZoomStepIndex);

  const zoomOut = () => {
    setZoomIndex((oldZoomIndex) => {
      const newZoomIndex = oldZoomIndex - 1;

      return newZoomIndex < 0 ? 0 : newZoomIndex;
    });
  };

  const zoomIn = () => {
    setZoomIndex((oldZoomIndex) => {
      const newZoomIndex = oldZoomIndex + 1 ?? maxZoomStepIndex;
      return newZoomIndex > maxZoomStepIndex ? maxZoomStepIndex : newZoomIndex;
    });
  };

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

  const onReveal = () => setZoomIndex(0);
  const zoomPercentage = zoomIncrements[zoomIndex] ?? 100;

  const title = zoomPercentage === 100 ? name : "What the f*ck is that?!";

  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      <div className={styles.pictureContainerWrapper}>
        <div className={styles.pictureContainer}>
          <img
            src={src}
            style={{
              transform: `scale(${zoomPercentage / ZOOM_FACTOR})`,
              transformOrigin: `${transformCenter?.x ?? 50}% ${
                transformCenter?.y ?? 50
              }%`,
            }}
          />
        </div>
        <div className={styles.options}>
          <div className={styles.zoomOptions}>
            <Button onClick={zoomOut}>🔍 -</Button>
            <h3>{zoomPercentage} %</h3>
            <Button onClick={zoomIn}>🔍 +</Button>
          </div>
          {/* <Button size='large' onClick={onReveal}>Revelio!</Button> */}
        </div>
      </div>
    </div>
  );
};
