import React, { FC } from "react";
import { Slide } from "../types";
import styles from "./SlideCard.module.scss";
import { useCombinedClasses } from "../../../hooks/useCombinedClasses";

export type SlideCardProps = {
  slide: Slide;
  selected?: boolean;
  onClick?(slide: Slide): void;
};

export const SlideCard: FC<SlideCardProps> = ({
  slide,
  selected = false,
  onClick: onClick,
}) => {
  return React.createElement(onClick ? "button" : "div", {
    onClick: onClick ? () => onClick(slide) : undefined,
    className: useCombinedClasses(
      styles.slideCard,
      selected && styles.selected
    ),
    children: (
      <>
        {slide.imageSrc && (
          <div className={styles.slidePreview} title={slide.answer}>
            <img
              src={slide.imageSrc}
              alt={`Preview image for slide "${slide.answer}"`}
            />
          </div>
        )}
        {slide.answer ? (
          <p className={styles.title}>{slide.answer}</p>
        ) : (
          <p className={styles.cardPlaceholderTitle}>(Empty slide)</p>
        )}
      </>
    ),
  });
};
