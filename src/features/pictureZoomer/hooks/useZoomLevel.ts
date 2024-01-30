import { useState } from "react";
import clamp from "lodash/clamp";

export const ZOOM_INCREMENTS = [1, 1.5, 2, 2.5, 3.5, 5, 8, 12, 16, 25];
const MAX_ZOOM_STEP_INDEX = ZOOM_INCREMENTS.length - 1;

export const useZoomLevel = () => {
  const [zoomIndex, setZoomIndex] = useState(MAX_ZOOM_STEP_INDEX);
  const zoomScale = ZOOM_INCREMENTS.at(zoomIndex) ?? 1;

  const zoomOut = () => {
    setZoomIndex((oldZoomIndex) =>
      clamp(oldZoomIndex - 1, 0, MAX_ZOOM_STEP_INDEX)
    );
  };

  const zoomIn = () => {
    setZoomIndex((oldZoomIndex) =>
      clamp(oldZoomIndex + 1, 0, MAX_ZOOM_STEP_INDEX)
    );
  };

  return {
    zoomIn,
    zoomOut,
    zoomScale,
  };
};
