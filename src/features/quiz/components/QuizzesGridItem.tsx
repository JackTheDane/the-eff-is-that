import { FC } from "react";
import { Quiz } from "../types";
import { Link } from "react-router-dom";

import styles from "./QuizzesGridItem.module.scss";

export type QuizzesGridItemProps = {
  quiz: Quiz;
  href: string;
};

export const QuizzesGridItem: FC<QuizzesGridItemProps> = ({ quiz, href }) => {
  return (
    <Link to={href} className={styles.quizGridItem}>
      <div className={styles.quizSlidePreviewsContainer}>
        {quiz.slides.slice(0, 4).map((slide) => (
          <div className={styles.quizSlidePreview}>
            <img src={slide.imageSrc} alt="" />
          </div>
        ))}
      </div>
      <p className={styles.quizName}>{quiz.name}</p>
    </Link>
  );
};
