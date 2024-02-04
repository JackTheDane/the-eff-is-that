import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizStorage } from "../storage";
import { Quiz } from "../types";
import { QUIZ_STORE_NAME } from "../constants";

export const useSetQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quiz: Quiz) => quizStorage.set(quiz.id, quiz),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [QUIZ_STORE_NAME] });
      // TODO: Investigate if I need to invalidate the quizId as well
    },
  });
};
