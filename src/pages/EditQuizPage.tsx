import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ROUTES } from "../routes";
import styles from "./EditQuizPage.module.scss";
import { QuizForm } from "../features/quiz/components/QuizForm";
import { useQuiz } from "../features/quiz/hooks/useQuiz";

export const EditQuizPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { data: quiz, error, isPending } = useQuiz(quizId!);

  const renderContent = () => {
    if (isPending) {
      return <>Loading...</>;
    }

    if (error) {
      return <>Quiz fetch failed...</>;
    }

    return <QuizForm quiz={quiz} />;
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
