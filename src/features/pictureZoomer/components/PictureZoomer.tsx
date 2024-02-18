import { FC, ReactNode } from "react";
import styles from "./PictureZoomer.module.scss";
import { Slide } from "../../slides/types";
import { PictureZoomerTitle } from "./_internal/PictureZoomerTitle";
import { createNamespacedComponent } from "../../../utils/createNamespacedComponent";
import { PictureZoomerActions } from "./_internal/PictureZoomerActions";
import { PictureZoomerPicture } from "./_internal/PictureZoomerPicture";
import { ZoomLevelContextProvider } from "../contexts/zoomLevelContext";
import { SelectedSlideContextProvider } from "../contexts/selectedSlideContext";

export type PictureZoomerProps = {
  slide: Slide;
  children?: ReactNode;
};

const PictureZoomerComponent: FC<PictureZoomerProps> = ({
  slide,
  children,
}) => {
  return (
    <SelectedSlideContextProvider slide={slide}>
      <ZoomLevelContextProvider>
        <div className={styles.root}>{children}</div>
      </ZoomLevelContextProvider>
    </SelectedSlideContextProvider>
  );
};

export const PictureZoomer = createNamespacedComponent(PictureZoomerComponent, {
  Title: PictureZoomerTitle,
  Picture: PictureZoomerPicture,
  Actions: PictureZoomerActions,
});
