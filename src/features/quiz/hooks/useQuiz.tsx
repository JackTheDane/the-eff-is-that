import { useQuery } from "@tanstack/react-query";
import { QUIZ_STORE_NAME } from "../constants";
import { quizStorage } from "../storage";
import { Quiz } from "../types";

export const useQuiz = (quizId: Quiz["id"]) =>
  useQuery({
    queryKey: [QUIZ_STORE_NAME, quizId],
    queryFn: async () => quizStorage.get(quizId),
  });
