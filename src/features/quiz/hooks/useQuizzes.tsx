import { useQuery } from "@tanstack/react-query";
import { QUIZ_STORE_NAME } from "../constants";
import { quizStorage } from "../storage";

export const useQuizzes = () =>
  useQuery({
    queryKey: [QUIZ_STORE_NAME],
    queryFn: async () => quizStorage.getAll(),
  });
