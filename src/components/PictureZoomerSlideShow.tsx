import { Button } from "./Button";
import { PictureZoomer, PictureZoomerProps } from "./PictureZoomer";
import styles from "./PictureZoomerSlideShow.module.scss";
import charmander from "../assets/c.png";
import nisssehue from "../assets/n.jpg";
import { useState } from "react";
import { useCombinedClasses } from "../hooks/useCombinedClasses";

const data: PictureZoomerProps[] = [
  {
    src: charmander,
    transformCenter: {
      x: 17,
      y: 80,
    },
  },
  {
    src: nisssehue,
    // transformCenter: {
    //   x: 17,
    //   y: 80,
    // },
  },
];

const maxSlideIndex = data.length - 1;

export const PictureZoomerSlideShow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const goToPreviousSlide = () => {
    setSlideIndex((prevSlideIndex) => {
      const newSlideIndex = prevSlideIndex - 1;

      return newSlideIndex < 0 ? 0 : newSlideIndex;
    });
  };

  const goToNextSlide = () => {
    setSlideIndex((prevSlideIndex) => {
      const newSlideIndex = prevSlideIndex + 1;

      return newSlideIndex > newSlideIndex ? maxSlideIndex : newSlideIndex;
    });
  };

  const selectedPicture = data[slideIndex] ?? data[0];

  return (
    <div className={styles.slideshow}>
      <Button
        onClick={goToPreviousSlide}
        size="large"
        className={useCombinedClasses(styles.slideIndexButton, slideIndex === 0 && styles.hidden)}
      >
        👈
      </Button>

      <div className={styles.zoomerWrapper}>
        <PictureZoomer {...selectedPicture} />
      </div>

      <Button
        onClick={goToNextSlide}
        size="large"
        className={useCombinedClasses(styles.slideIndexButton, slideIndex === maxSlideIndex && styles.hidden)}
      >
        👉
      </Button>
    </div>
  );
};
