import { useQuizzesStore } from "../hooks/useQuizzesStore";
import styles from "./QuizzesGrid.module.scss";
import { QuizzesGridItem } from "./QuizzesGridItem";

export const QuizzesGrid = () => {
  const { quizzes: quizzes } = useQuizzesStore();

  return (
    <div className={styles.quizzesGrid}>
      {quizzes.map((quiz) => (
        <QuizzesGridItem quiz={quiz} key={quiz.id} />
      ))}
    </div>
  );
};
