import { FC, useState } from 'react';
import { Button } from './Button';
import styles from './PictureZoomer.module.scss';

export type PictureZoomerProps = {
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
  250,
  400,
  800,
  1200,
  1600,
  2000,
]

export const PictureZoomer: FC<PictureZoomerProps> = ({
  src,
  transformCenter
}) => {
  const [zoomIndex, setZoomIndex] = useState(zoomSteps.length - 1);

  const onZoomOut = () => {
    setZoomIndex(oldZoomIndex => {
      const newZoomIndex = oldZoomIndex - 1 ?? 0;
      return newZoomIndex;
    })
  }

  const onZoomIn = () => {
    setZoomIndex(oldZoomIndex => {
      const newZoomIndex = oldZoomIndex - 1 ?? 0;
      return newZoomIndex;
    })
  }

  const onReveal = () => setZoomIndex(0);

  const zoomPercentage = zoomSteps[zoomIndex] ?? 100;


  return (
      <div className={styles.root}>
        <div className={styles.pictureContainerWrapper}>

          <div className={styles.pictureContainer}>
            <img src={src} style={{
              transform: `scale(${zoomPercentage / ZOOM_FACTOR})`,
              transformOrigin: `${transformCenter?.x ?? 50}% ${transformCenter?.y ?? 50}%`
            }} />
          </div>
          {zoomPercentage} %
        </div>

        <div className={styles.options}>
          <Button onClick={onZoomIn}>🔍 +</Button>
          <Button onClick={onZoomOut}>🔍 -</Button>
          <Button size='large' onClick={onReveal}>Revelio!</Button>
        </div>
      </div>
  )
}
