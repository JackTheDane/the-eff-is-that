import { FC, useState } from 'react';
import { Button } from './Button';
import styles from './PictureZoomer.module.scss';

export type PictureZoomerProps = {
  name: string;
  src: string;
  transformCenter?: {
    x: number;
    y: number
  };
}

const ZOOM_FACTOR = 100;

const zoomSteps = [
  100,
  150,
  200,
  250,
  350,
  500,
  800,
  1200,
  2000,
  2500,
]

const maxZoomStepIndex = zoomSteps.length - 1;

export const PictureZoomer: FC<PictureZoomerProps> = ({
  name,
  src,
  transformCenter
}) => {
  const [zoomIndex, setZoomIndex] = useState(maxZoomStepIndex);

  const onZoomOut = () => {
    setZoomIndex(oldZoomIndex => {
      const newZoomIndex = oldZoomIndex - 1;

      return newZoomIndex < 0 ? 0 : newZoomIndex;
    })
  }

  const onZoomIn = () => {
    setZoomIndex(oldZoomIndex => {
      const newZoomIndex = oldZoomIndex + 1 ?? maxZoomStepIndex;
      return newZoomIndex > maxZoomStepIndex ? maxZoomStepIndex : newZoomIndex;
    })
  }

  const onReveal = () => setZoomIndex(0);
  const zoomPercentage = zoomSteps[zoomIndex] ?? 100;

  const title = zoomPercentage === 100 ? name : 'What the f*ck is that?!';

  return (
      <div className={styles.root}>
        <h2>{title}</h2>
        <div className={styles.pictureContainerWrapper}>
          <div className={styles.pictureContainer}>
            <img src={src} style={{
              transform: `scale(${zoomPercentage / ZOOM_FACTOR})`,
              transformOrigin: `${transformCenter?.x ?? 50}% ${transformCenter?.y ?? 50}%`
            }} />
          </div>
          <div className={styles.options}>
            <div className={styles.zoomOptions}>
              <Button onClick={onZoomOut}>🔍 -</Button>
              <h3>{zoomPercentage} %</h3>
              <Button onClick={onZoomIn}>🔍 +</Button>
            </div>
            {/* <Button size='large' onClick={onReveal}>Revelio!</Button> */}
          </div>
        </div>
      </div>
  )
}
