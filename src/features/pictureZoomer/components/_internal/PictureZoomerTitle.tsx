import { ZOOM_INCREMENTS } from "../../constants";
import { useSelectedSlide } from "../../contexts/selectedSlideContext";
import { useZoomLevel } from "../../contexts/zoomLevelContext";
import styles from "./PictureZoomerTitle.module.scss";

export const PictureZoomerTitle = () => {
  const { zoomLevel } = useZoomLevel() ?? {};
  const { selectedSlide } = useSelectedSlide() ?? {};

  return (
    <h2 className={styles.title}>
      {zoomLevel === ZOOM_INCREMENTS[0]
        ? selectedSlide?.answer
        : "What the 🦆 is that?!"}
    </h2>
  );
};
