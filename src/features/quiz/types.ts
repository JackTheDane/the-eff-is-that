import type { Slide } from "../slides/types";

export type Quiz = {
  id: string;
  name: string;
  slides: Slide[];
};
