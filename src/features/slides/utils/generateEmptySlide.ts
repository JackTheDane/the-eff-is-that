import { generateUniqueId } from "../../id/utils/generateUniqueId";
import { Slide } from "../types";

export const generateEmptySlide = () => {
  return {
    id: generateUniqueId(),
    answer: "",
    centerOrigin: {
      x: 50,
      y: 50,
    },
  } satisfies Slide;
};
