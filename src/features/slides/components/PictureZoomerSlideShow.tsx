import { PictureZoomer } from "../../pictureZoomer/components/PictureZoomer";
import styles from "./PictureZoomerSlideShow.module.scss";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useCombinedClasses } from "../../../hooks/useCombinedClasses";
import { useKeyboardEvent } from "../../../hooks/useKeyboardEvent";
import { ROUTES } from "../../../routes";
import clamp from "lodash/clamp";
import { Slide } from "../types";
import { FC } from "react";

export type PictureZoomerSlideShowProps = {
  slides: Slide[];
};

export const PictureZoomerSlideShow: FC<PictureZoomerSlideShowProps> = ({
  slides,
}) => {
  const navigate = useNavigate();
  const { slideIndex: slideIndexString, quizId } = useParams();
  const slideIndex = slideIndexString ? Number(slideIndexString) : 0;
  const maxSlideIndex = slides.length - 1;

  if (!quizId) {
    return <Navigate to={ROUTES.home} />;
  }

  const goToPreviousSlide = () => {
    navigate(
      ROUTES.quiz.play.route(quizId, clamp(slideIndex - 1, 0, maxSlideIndex))
    );
  };

  const goToNextSlide = () => {
    navigate(
      ROUTES.quiz.play.route(quizId, clamp(slideIndex + 1, 0, maxSlideIndex))
    );
  };

  useKeyboardEvent((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        goToPreviousSlide();
        break;

      case "ArrowRight":
        goToNextSlide();
        break;
    }
  });

  const selectedSlide = slides[slideIndex] ?? slides[0];

  return (
    <div className={styles.slideshow}>
      {slideIndex > 0 ? (
        <Button
          onClick={goToPreviousSlide}
          size="large"
          className={useCombinedClasses(
            styles.slideIndexButton,
            slideIndex === 0 && styles.hidden
          )}
        >
          👈
        </Button>
      ) : (
        <Button
          onClick={() => navigate(ROUTES.lobby)}
          size="large"
          className={styles.slideIndexButton}
        >
          <span>☕</span>
          Lobby
        </Button>
      )}

      <div className={styles.zoomerWrapper}>
        <PictureZoomer slide={selectedSlide} key={slideIndex} />
      </div>

      {slideIndex < maxSlideIndex ? (
        <Button
          onClick={goToNextSlide}
          size="large"
          className={styles.slideIndexButton}
        >
          👉
        </Button>
      ) : (
        <Button
          onClick={() => navigate(ROUTES.quiz.winner.route(quizId))}
          size="large"
          className={styles.slideIndexButton}
        >
          👑
        </Button>
      )}
    </div>
  );
};
