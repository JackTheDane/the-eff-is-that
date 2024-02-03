import { create } from "zustand";
import type { Slide } from "../../slides/types";
import { Quiz } from "../types";

// TEMP
import charmander from "../../../assets/c.png";
import biksemad from "../../../assets/biksemad.webp";
import guldkorn from "../../../assets/guldkorn.jpg";
import kat from "../../../assets/kat.jpg";
import tommy from "../../../assets/tommy.jpg";
import hagrid from "../../../assets/hagrid.jpg";
import vanillaCoke from "../../../assets/vanilla_cherry_coke.png";
import appelsin from "../../../assets/appelsin.jpg";
import dronning from "../../../assets/dronning.jpg";
import santa from "../../../assets/santa.png";
import silverOrnament from "../../../assets/silver_ornament.jpg";

type QuizzesStore = {
  quizzes: Quiz[];
};

export const useQuizzesStore = create<QuizzesStore>((set) => ({
  quizzes: [
    {
      id: "123123132",
      name: "Initial quiz",
      slides: [
        {
          id: "a",
          answer: "En appelsin!",
          imageSrc: appelsin,
          centerOrigin: {
            x: 50,
            y: 50,
          },
        },
        {
          id: "b",
          answer: "Julemanden!",
          imageSrc: santa,
          centerOrigin: {
            x: 50,
            y: 50,
          },
        },
        {
          id: "c",
          answer: "Charmander!",
          imageSrc: charmander,
          centerOrigin: {
            x: 17,
            y: 80,
          },
        },
        {
          id: "d",
          answer: "MISSEN!! (Aka. Tali)",
          imageSrc: kat,
          centerOrigin: {
            x: 60,
            y: 35,
          },
        },
        {
          id: "e",
          answer: "En sund & nærende morgenmad!",
          imageSrc: guldkorn,
          centerOrigin: {
            x: 57,
            y: 60,
          },
        },
        {
          id: "f",
          answer: "PS1 Hagrid",
          imageSrc: hagrid,
          centerOrigin: {
            x: 40,
            y: 44,
          },
        },
        {
          id: "g",
          answer: "Vores allesammens majestæt 👑!",
          imageSrc: dronning,
          centerOrigin: {
            x: 50,
            y: 50,
          },
        },
        {
          id: "h",
          answer: "Biksemad!",
          imageSrc: biksemad,
          centerOrigin: {
            x: 60,
            y: 50,
          },
        },
        {
          id: "i",
          answer: "Vanilla cherry coke... 🤢",
          imageSrc: vanillaCoke,
          centerOrigin: {
            x: 50,
            y: 68,
          },
        },
        {
          id: "j",
          answer: "Tommy Wiseau",
          imageSrc: tommy,
          centerOrigin: {
            x: 48,
            y: 50,
          },
        },
        {
          id: "k",
          answer: "Et fint sølvsmykke 💖",
          imageSrc: silverOrnament,
          centerOrigin: {
            x: 50,
            y: 50,
          },
        },
      ],
    },
  ],
}));

export const quizzesStoreActions = {
  quiz: {
    add(quizValues: Omit<Quiz, "id">) {
      useQuizzesStore.setState(({ quizzes }) => ({
        quizzes: [...quizzes, { ...quizValues, id: crypto.randomUUID() }],
      }));
    },

    edit(quizId: Quiz["id"], updatedQuizValues: Partial<Omit<Quiz, "id">>) {
      useQuizzesStore.setState(({ quizzes }) => ({
        quizzes: quizzes.map((quiz) =>
          quiz.id === quizId
            ? {
                ...quiz,
                ...updatedQuizValues,
              }
            : quiz
        ),
      }));
    },

    delete(quizId: Quiz["id"]) {
      useQuizzesStore.setState(({ quizzes }) => ({
        quizzes: quizzes.filter((quiz) => quiz.id !== quizId),
      }));
    },
  },

  slide: {
    add(quizId: Quiz["id"], slide: Omit<Slide, "id">) {
      useQuizzesStore.setState(({ quizzes }) => ({
        quizzes: quizzes.map((quiz) =>
          quiz.id === quizId
            ? {
                ...quiz,
                slides: [...quiz.slides, { ...slide, id: crypto.randomUUID() }],
              }
            : quiz
        ),
      }));
    },

    edit(
      quizId: Quiz["id"],
      slideId: Slide["id"],
      updatedSlideValues: Partial<Omit<Slide, "id">>
    ) {
      useQuizzesStore.setState(({ quizzes }) => ({
        quizzes: quizzes.map((quiz) =>
          quiz.id === quizId
            ? {
                ...quiz,
                slides: quiz.slides.map((slide) =>
                  slide.id === slideId
                    ? {
                        ...slide,
                        ...updatedSlideValues,
                      }
                    : slide
                ),
              }
            : quiz
        ),
      }));
    },

    delete(quizId: Quiz["id"], slideId: Slide["id"]) {
      useQuizzesStore.setState(({ quizzes }) => ({
        quizzes: quizzes.map((quiz) =>
          quiz.id === quizId
            ? {
                ...quiz,
                slides: quiz.slides.filter((slide) => slide.id !== slideId),
              }
            : quiz
        ),
      }));
    },
  },
};
