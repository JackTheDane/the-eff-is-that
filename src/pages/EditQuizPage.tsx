import { useParams } from "react-router-dom";

export const EditQuizPage = () => {
  const { quizId } = useParams();

  return <div>EditQuizPage: {quizId}</div>;
};
