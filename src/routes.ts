import { generatePath } from "react-router-dom";

export const ROUTES = {
  home: "/",
  lobby: "/lobby",
  quiz: {
    overview: "/quiz",
    edit: {
      pattern: "/quiz/:quizId/edit",
      route(quizId: string) {
        return generatePath(this.pattern, { quizId });
      },
    },
    play: {
      pattern: "/quiz/:quizId/play/:slideIndex",
      route(quizId: string, slideIndex: number) {
        return generatePath(this.pattern, {
          quizId,
          slideIndex: slideIndex.toString(),
        });
      },
    },
    winner: {
      pattern: "/quiz/:quizId/winner",
      route(quizId: string) {
        return generatePath(this.pattern, { quizId });
      },
    },
  },
} as const;
