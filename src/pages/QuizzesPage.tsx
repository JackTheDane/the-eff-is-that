import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ROUTES } from "../routes";
import styles from "./QuizzesPage.module.scss";
import {
  quizzesStoreActions,
  useQuizzesStore,
} from "../features/quiz/hooks/useQuizzesStore";
import { QuizzesGridItem } from "../features/quiz/components/QuizzesGridItem";

export const QuizzesPage = () => {
  const navigate = useNavigate();
  const { quizzes } = useQuizzesStore();

  return (
    <>
      <Header>
        <Button onClick={() => navigate(ROUTES.home)}>👈 Back</Button>
        <Button
          variant="success"
          onClick={() => {
            const quizName = window.prompt("Quiz name?");

            if (quizName) {
              const newQuiz = quizzesStoreActions.quiz.add({
                name: quizName,
                slides: [],
              });

              navigate(ROUTES.quiz.edit.route(newQuiz.id));
            }
          }}
        >
          + Create new
        </Button>
      </Header>
      <div className={styles.quizzesWrapper}>
        {quizzes.map((quiz) => (
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
