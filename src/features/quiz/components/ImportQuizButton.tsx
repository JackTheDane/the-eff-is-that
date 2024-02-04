import { Quiz } from "../types";
import { FileUploadButton } from "../../files/components/FileUploadButton";
import { useSetQuiz } from "../hooks/useSetQuiz";

const convertQuizFileToJson = (quizFile: File) =>
  new Promise<Quiz>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function ({ target }) {
      try {
        const jsonString = target?.result as string;
        const parsedQuiz = JSON.parse(jsonString) as Quiz;

        resolve(parsedQuiz);
      } catch (error) {
        console.error("Error parsing Quiz file:", error);
        reject(error);
      }
    };

    reader.readAsText(quizFile);
  });

export const ImportQuizButton = () => {
  const { mutateAsync: addQuiz, isPending } = useSetQuiz();

  const onFilesUploaded = async (files: File[]) => {
    for await (const file of files) {
      addQuiz(await convertQuizFileToJson(file));
    }
  };

  return (
    <FileUploadButton multiple disabled={isPending} onChange={onFilesUploaded}>
      📤 Import quiz
    </FileUploadButton>
  );
};
