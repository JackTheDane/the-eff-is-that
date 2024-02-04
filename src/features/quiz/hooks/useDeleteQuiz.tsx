import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizStorage } from "../storage";
import { QUIZ_STORE_NAME } from "../constants";
import { Quiz } from "../types";

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizId: Quiz["id"]) => quizStorage.remove(quizId),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [QUIZ_STORE_NAME] });
      // TODO: Investigate if I need to invalidate the quizId as well
    },
  });
};
