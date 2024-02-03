import { ComponentPropsWithoutRef, FC } from "react";
import { Quiz } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PictureZoomer } from "../../pictureZoomer/components/PictureZoomer";
import { quizSchema } from "../schemas";
import { Button } from "../../../components/Button";

export type QuizFormProps = {
  quiz: Quiz;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

export const QuizForm: FC<QuizFormProps> = ({ quiz }) => {
  const { control, handleSubmit, reset } = useForm<Quiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: quiz,
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Button>💾 Save</Button>
        <Button>💾 Save</Button>
      </form>
      <div>
        <PictureZoomer slide={quiz.slides[0]} showTitle={false} />
        <div>
          {quiz.slides.map((slide) => (
            <div>{slide.answer}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
