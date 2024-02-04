import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ROUTES } from "../routes";
import styles from "./QuizzesPage.module.scss";
import { QuizzesGridItem } from "../features/quiz/components/QuizzesGridItem";
import { useSetQuiz } from "../features/quiz/hooks/useSetQuiz";
import { generateUniqueId } from "../features/id/utils/generateUniqueId";
import { useQuizzes } from "../features/quiz/hooks/useQuizzes";
import { ImportQuizButton } from "../features/quiz/components/ImportQuizButton";

export const QuizzesPage = () => {
  const navigate = useNavigate();
  const { data: quizzes, isError, isLoading } = useQuizzes();

  console.log({ quizzes, isError, isLoading });

  const { mutateAsync: createQuiz } = useSetQuiz();

  return (
    <>
      <Header>
        <Button onClick={() => navigate(ROUTES.home)}>👈 Back</Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ImportQuizButton />
          <Button
            variant="success"
            onClick={() => {
              const quizName = window.prompt("Quiz name?");

              if (quizName) {
                createQuiz({
                  id: generateUniqueId(),
                  name: quizName,
                  slides: [],
                }).then((newQuiz) => {
                  navigate(ROUTES.quiz.edit.route(newQuiz.id));
                });
              }
            }}
          >
            + Create new
          </Button>
        </div>
      </Header>
      <div className={styles.quizzesWrapper}>
        {quizzes?.map((quiz) => (
          <QuizzesGridItem
            quiz={quiz}
            href={ROUTES.quiz.edit.route(quiz.id)}
            key={quiz.id}
          />
        ))}
      </div>
    </>
  );
};
