import { Slide } from "../../slides/types";
import round from "lodash/round";

export const getPixelDistanceAsPercentage = (
  image: Required<Slide>["image"],
  dragDistance: { x: number; y: number },
  zoomLevel?: number
) => {
  return {
    x: round((dragDistance.x / (image.width * (zoomLevel ?? 1))) * 100, 100),
    y: round((dragDistance.y / (image.height * (zoomLevel ?? 1))) * 100, 100),
  };
};
