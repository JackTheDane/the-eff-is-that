import { useSelectedSlide } from "../../contexts/selectedSlideContext";
import { useZoomLevel } from "../../contexts/zoomLevelContext";
import styles from "./PictureZoomerPicture.module.scss";

export const PictureZoomerPicture = () => {
  const { selectedSlide } = useSelectedSlide() ?? {};
  const { zoomLevel } = useZoomLevel() ?? {};

  return (
    <div className={styles.pictureContainer}>
      {selectedSlide?.imageSrc ? (
        <img
          src={selectedSlide.imageSrc}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${selectedSlide.centerOrigin?.x ?? 50}% ${
              selectedSlide.centerOrigin?.y ?? 50
            }%`,
          }}
        />
      ) : (
        <span className={styles.picturePlaceholder}>(No image)</span>
      )}
    </div>
  );
};
