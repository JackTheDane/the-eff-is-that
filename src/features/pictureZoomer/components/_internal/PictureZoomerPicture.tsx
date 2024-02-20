import { combineClasses } from "../../../../utils/combineClasses";
import { Slide } from "../../../slides/types";
import { useSelectedSlide } from "../../contexts/selectedSlideContext";
import { useZoomLevel } from "../../contexts/zoomLevelContext";
import styles from "./PictureZoomerPicture.module.scss";
import type { ComponentPropsWithoutRef } from "react";

export type PictureZoomerPictureProps = {
  className?: string;
} & ComponentPropsWithoutRef<"div"> &
  Partial<Pick<Slide, "centerOrigin">>;

export const PictureZoomerPicture = ({
  className,
  centerOrigin,
  ...props
}: PictureZoomerPictureProps) => {
  const { selectedSlide } = useSelectedSlide() ?? {};
  const { zoomLevel } = useZoomLevel() ?? {};

  return (
    <div
      className={combineClasses(styles.pictureContainer, className)}
      {...props}
    >
      {selectedSlide?.image ? (
        <img
          src={selectedSlide.image.src}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: `${
              centerOrigin?.x ?? selectedSlide.centerOrigin?.x ?? 50
            }% ${centerOrigin?.y ?? selectedSlide.centerOrigin?.y ?? 50}%`,
          }}
        />
      ) : (
        <span className={styles.picturePlaceholder}>(No image)</span>
      )}
    </div>
  );
};
