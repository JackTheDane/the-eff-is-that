import { FC } from "react";
import { Quiz } from "../types";
import { Link } from "react-router-dom";

import styles from "./QuizzesGridItem.module.scss";
import { combineClasses } from "../../../utils/combineClasses";

export type QuizzesGridItemProps = {
  quiz: Quiz;
  selected?: boolean;
} & (
  | {
      href?: string;
      onClick?: never;
    }
  | {
      href?: never;
      onClick?(quiz: Quiz): void;
    }
);

export const QuizzesGridItem: FC<QuizzesGridItemProps> = ({
  quiz,
  selected = false,
  href,
  onClick,
}) => {
  const renderContent = () => (
    <>
      <div className={styles.quizSlidePreviewsContainer}>
        {quiz.slides.slice(0, 4).map((slide) => (
          <div className={styles.quizSlidePreview} key={slide.id}>
            <img src={slide.imageSrc} alt="" />
          </div>
        ))}
      </div>
      <p className={styles.quizName}>{quiz.name}</p>
    </>
  );

  const combinedClasses = combineClasses(
    styles.quizGridItem,
    selected && styles.selected
  );

  return href ? (
    <Link to={href} className={combinedClasses}>
      {renderContent()}
    </Link>
  ) : (
    <button
      className={combinedClasses}
      onClick={onClick ? () => onClick(quiz) : undefined}
    >
      {renderContent()}
    </button>
  );
};
