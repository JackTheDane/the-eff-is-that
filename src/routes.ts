import { generatePath } from "react-router-dom";

export const ROUTES = {
  home: "/",
  game: {
    pattern: "/game/:slideIndex",
    route(slideIndex: number) {
      return generatePath(this.pattern, { slideIndex: slideIndex.toString() });
    },
  },
  winner: "/winner",
  lobby: "/lobby",
} as const;
