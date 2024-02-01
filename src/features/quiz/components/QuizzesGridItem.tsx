import { FC } from "react";
import { Quiz } from "../types";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";

import styles from "./QuizzesGridItem.module.scss";

export type QuizzesGridItemProps = {
  quiz: Quiz;
};

export const QuizzesGridItem: FC<QuizzesGridItemProps> = ({ quiz }) => {
  return (
    <Link to={ROUTES.quiz.edit.route(quiz.id)} className={styles.quizGridItem}>
      QuizezGridItem: {quiz.id}
    </Link>
  );
};
