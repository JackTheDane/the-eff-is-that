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
import { quizzesStoreActions } from "../hooks/useQuizzesStore";
import styles from "./QuizForm.module.scss";
import { SlideCard } from "../../slides/components/SlideCard";

export type QuizFormProps = {
  quiz: Quiz;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const QuizForm: FC<QuizFormProps> = ({ quiz }) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

  const { control, handleSubmit, reset } = useForm<Quiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: quiz,
  });

  const {
    fields: slideFields,
    remove,
    append,
  } = useFieldArray({
    control,
    name: "slides",
  });

  const selectedSlideField = useWatch({
    control,
    name: `slides`,
  }).at(selectedSlideIndex);

  return (
    <div className={styles.quizFormRoot}>
      <form
        onSubmit={handleSubmit(
          (data) => quizzesStoreActions.quiz.edit(quiz.id, data),
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
          <Button type="submit">💾 Save</Button>
          <Button type="button" onClick={() => reset()}>
            ❌ Cancel
          </Button>
        </div>
        <hr style={{ width: "100%" }} />
        <div className={styles.quizInputGroup}>
          <FormTextInput
            control={control}
            name={`slides.${selectedSlideIndex}.answer`}
            placeholder="Answer"
            key={`slides.${selectedSlideIndex}.answer`}
          />
          <FormNumberInput
            control={control}
            name={`slides.${selectedSlideIndex}.centerOrigin.x`}
            placeholder="center X"
            key={`slides.${selectedSlideIndex}.centerOrigin.x`}
          />
          <FormNumberInput
            control={control}
            name={`slides.${selectedSlideIndex}.centerOrigin.y`}
            placeholder="center Y"
            key={`slides.${selectedSlideIndex}.centerOrigin.y`}
          />
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
        </div>
      </div>
    </div>
  );
};
