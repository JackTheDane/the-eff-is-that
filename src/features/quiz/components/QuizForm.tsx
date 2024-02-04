import { ComponentPropsWithoutRef } from "react";
import { Quiz } from "../types";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { PictureZoomer } from "../../pictureZoomer/components/PictureZoomer";
import { quizSchema } from "../schemas";
import { Button } from "../../../components/Button";
import { FormTextInput } from "../../../components/inputs/form/FormTextInput";
import { FormNumberInput } from "../../../components/inputs/form/FormNumberInput";
import styles from "./QuizForm.module.scss";
import { SlideCard } from "../../slides/components/SlideCard";
import { FileUploadButton } from "../../files/components/FileUploadButton";
import { base64EncodeFile } from "../../files/utils/base64EncodeFile";
import { generateEmptySlide } from "../../slides/utils/generateEmptySlide";
import { useSetQuiz } from "../hooks/useSetQuiz";
import { useDeleteQuiz } from "../hooks/useDeleteQuiz";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes";

export type QuizFormProps = {
  quiz: Quiz;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const QuizForm: FC<QuizFormProps> = ({ quiz }) => {
  const navigate = useNavigate();

  const { mutateAsync: updateQuiz, isPending } = useSetQuiz();
  const { mutateAsync: deleteQuiz, isPending: isDeleting } = useDeleteQuiz();

  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<Quiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      ...quiz,
      slides: quiz.slides.length > 0 ? quiz.slides : [generateEmptySlide()],
    },
  });

  const { remove, append, update } = useFieldArray({
    control,
    name: "slides",
  });

  const slideFields = useWatch({
    control,
    name: `slides`,
  });

  const selectedSlideField = slideFields.at(selectedSlideIndex);

  const isFormActionsDisabled = !isDirty || isPending;

  return (
    <div className={styles.quizFormRoot}>
      <form
        onSubmit={handleSubmit(
          (data) => {
            updateQuiz(data).then((updatedQuiz) => reset(updatedQuiz));
          },
          (fieldErrors) => {
            console.log("Error...");
            console.log(fieldErrors);
            window.alert("Save failed, check console");
          }
        )}
        className={styles.quizForm}
      >
        <div className={styles.quizInputGroup}>
          <FormTextInput
            control={control}
            name="name"
            placeholder="Quiz name"
          />
          <Button type="submit" disabled={isFormActionsDisabled}>
            💾 Save
          </Button>
          <Button
            type="button"
            onClick={() => reset()}
            disabled={isFormActionsDisabled}
          >
            ❌ Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete quiz "${quiz.name}"?`
                )
              ) {
                deleteQuiz(quiz.id)
                  .then(() => {
                    navigate(ROUTES.quiz.overview, { replace: true });
                  })
                  .catch((error) => {
                    window.alert("Failed to delete quiz, check console");
                    console.log(error);
                  });
              }
            }}
            disabled={isPending || isDeleting}
          >
            💀 Delete quiz
          </Button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles.quizInputGroup}>
          {selectedSlideField && (
            <>
              <FormTextInput
                control={control}
                name={`slides.${selectedSlideIndex}.answer`}
                placeholder="Answer"
                key={`${selectedSlideField.id}-answer`}
              />
              {selectedSlideField.imageSrc && (
                <>
                  <FormNumberInput
                    control={control}
                    name={`slides.${selectedSlideIndex}.centerOrigin.x`}
                    placeholder="center X"
                    key={`${selectedSlideField.id}-centerOrigin-x`}
                  />
                  <FormNumberInput
                    control={control}
                    name={`slides.${selectedSlideIndex}.centerOrigin.y`}
                    placeholder="center Y"
                    key={`${selectedSlideField.id}-centerOrigin-y`}
                  />
                </>
              )}
              <FileUploadButton
                onChange={(imageFile) => {
                  base64EncodeFile(imageFile)
                    .then((imageBase64) => {
                      update(selectedSlideIndex, {
                        ...selectedSlideField,
                        imageSrc: imageBase64,
                      });
                    })
                    .catch(console.log);
                }}
                accept="accept='image/jpeg, image/png'"
              >
                📂
                <span>
                  {selectedSlideField.imageSrc
                    ? "Replace image"
                    : "Upload image"}
                </span>
              </FileUploadButton>
              <Button
                title={`Delete slide "${selectedSlideField.answer}"`}
                onClick={() => {
                  if (
                    window.confirm(
                      `Delete slide "${selectedSlideField.answer}"?`
                    )
                  ) {
                    remove(selectedSlideIndex);
                    if (selectedSlideIndex === slideFields.length - 1) {
                      setSelectedSlideIndex(slideFields.length - 2);
                    }
                  }
                }}
              >
                💀 Delete
              </Button>
            </>
          )}
        </div>
      </form>
      <div className={styles.formPreviewWrapper}>
        <div className={styles.pictureZoomerWrapper}>
          {selectedSlideField ? (
            <PictureZoomer
              slide={selectedSlideField}
              showTitle={false}
              key={selectedSlideField.id}
            />
          ) : (
            "Please select a slide on the right"
          )}
        </div>
        <div className={styles.slideCards}>
          {slideFields.map((slideField, index) => (
            <SlideCard
              slide={slideField}
              key={slideField.id}
              selected={index === selectedSlideIndex}
              onClick={() => setSelectedSlideIndex(index)}
            />
          ))}
          <hr style={{ width: "100%" }} />
          <Button
            variant="success"
            onClick={() => {
              append(generateEmptySlide());
              setSelectedSlideIndex(slideFields.length);
            }}
          >
            + Add new
          </Button>
        </div>
      </div>
    </div>
  );
};
