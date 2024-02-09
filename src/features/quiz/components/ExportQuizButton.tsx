import { FC } from "react";
import { Quiz } from "../types";
import { Button } from "../../../components/Button";
import { QUIZ_FILE_EXTENSION } from "../constants";

export type ExportQuizButtonProps = {
  quiz: Quiz;
};

function downloadObjectAsFile(
  obj: Record<string, any>,
  fileName: string
): void {
  const serializedObject = JSON.stringify(obj);
  const blob = new Blob([serializedObject], { type: "application/json" });
  const dataURL = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  downloadLink.download = fileName;
  downloadLink.click();

  URL.revokeObjectURL(dataURL);
}

const generateFileName = (quiz: Quiz) =>
  `${quiz.name}-${
    new Date().toISOString().split(".")[0]
  }.${QUIZ_FILE_EXTENSION}`;

export const ExportQuizButton: FC<ExportQuizButtonProps> = ({ quiz }) => {
  return (
    <Button
      type="button"
      onClick={() => {
        downloadObjectAsFile(quiz, generateFileName(quiz));
      }}
    >
      📥 Export to file
    </Button>
  );
};
