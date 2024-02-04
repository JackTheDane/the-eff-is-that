import { SELECTED_QUIZ_QUERY_PARAMETER_KEY } from "./features/quiz/constants";
import { Quiz } from "./features/quiz/types";
import { generatePath } from "react-router-dom";

export const ROUTES = {
  home: "/",
  lobby: {
    players: "/lobby/players",
    quizzes: {
      pattern: "/lobby/quizes",
      route(selectedQuizId?: Quiz["id"]) {
        const searchQueryString = selectedQuizId
          ? `?${new URLSearchParams([
              [SELECTED_QUIZ_QUERY_PARAMETER_KEY, selectedQuizId],
            ]).toString()}`
          : "";

        return `${generatePath(this.pattern)}${searchQueryString}`;
      },
    },
  },
  quiz: {
    overview: "/quiz",
    edit: {
      pattern: "/quiz/:quizId/edit",
      route(quizId: Quiz["id"]) {
        return generatePath(this.pattern, { quizId });
      },
    },
    play: {
      pattern: "/quiz/:quizId/play/:slideIndex",
      route(quizId: Quiz["id"], slideIndex: number) {
        return generatePath(this.pattern, {
          quizId,
          slideIndex: slideIndex.toString(),
        });
      },
    },
    winner: {
      pattern: "/quiz/:quizId/winner",
      route(quizId: Quiz["id"]) {
        return generatePath(this.pattern, { quizId });
      },
    },
  },
} as const;
