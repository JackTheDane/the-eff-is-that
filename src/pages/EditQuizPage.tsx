import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ROUTES } from "../routes";
import styles from "./EditQuizPage.module.scss";
import { useQuizzesStore } from "../features/quiz/hooks/useQuizzesStore";
import { QuizForm } from "../features/quiz/components/QuizForm";

export const EditQuizPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { quizzes } = useQuizzesStore();
  const matchingQuiz = quizzes.find(({ id }) => id === quizId);

  const renderContent = () => {
    if (!matchingQuiz) {
      return <>Quiz not found... 🤔</>;
    }

    return <QuizForm quiz={matchingQuiz} />;
  };

  return (
    <>
      <Header>
        <Button onClick={() => navigate(ROUTES.quiz.overview)}>👈 Back</Button>
      </Header>
      <div className={styles.content}>{renderContent()}</div>
    </>
  );
};
