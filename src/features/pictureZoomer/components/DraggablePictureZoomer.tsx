import { Slide } from "../../slides/types";
import { PictureZoomer } from "./PictureZoomer";
import styles from "./DraggablePictureZoomer.module.scss";
import { combineClasses } from "../../../utils/combineClasses";
import { useDragHandlers } from "../hooks/useDragHandlers";
import { getPixelDistanceAsPercentage } from "../utils/getPixelDistanceAsPercentage";
import { useZoomLevel } from "../contexts/zoomLevelContext";

type DraggablePictureZoomerProps = {
  slide: Slide;
  onDragEnd(distance: { x: number; y: number }, zoomLevel?: number): void;
};

export const DraggablePictureZoomer = ({
  slide,
  onDragEnd,
}: DraggablePictureZoomerProps) => {
  return (
    <PictureZoomer slide={slide}>
      <DraggablePictureZoomerPicture slide={slide} onDragEnd={onDragEnd} />
      <PictureZoomer.Actions />
    </PictureZoomer>
  );
};

const DraggablePictureZoomerPicture = ({
  slide,
  onDragEnd,
}: Pick<DraggablePictureZoomerProps, "slide" | "onDragEnd">) => {
  const { zoomLevel } = useZoomLevel() ?? {};
  const { onMouseDown, dragDistance } = useDragHandlers((dragDistance) =>
    onDragEnd(dragDistance, zoomLevel)
  );

  if (slide.image && dragDistance) {
    console.log(
      getPixelDistanceAsPercentage(slide.image, dragDistance, zoomLevel)
    );
  }

  return (
    <PictureZoomer.Picture
      className={combineClasses(
        slide.image && styles.crosshair,
        slide.image && styles.draggable
      )}
      onMouseDown={onMouseDown}
      centerOrigin={
        dragDistance && slide.image
          ? {
              x:
                slide.centerOrigin.x -
                getPixelDistanceAsPercentage(
                  slide.image,
                  dragDistance,
                  zoomLevel
                ).x,
              y:
                slide.centerOrigin.y -
                getPixelDistanceAsPercentage(
                  slide.image,
                  dragDistance,
                  zoomLevel
                ).y,
            }
          : undefined
      }
    />
  );
};
