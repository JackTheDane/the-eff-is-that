import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { ROUTES } from "../routes";
import styles from "./LobbyQuizOverview.module.scss";
import { QuizzesGridItem } from "../features/quiz/components/QuizzesGridItem";
import { SELECTED_QUIZ_QUERY_PARAMETER_KEY } from "../features/quiz/constants";
import { useQuizzes } from "../features/quiz/hooks/useQuizzes";

export const LobbyQuizOverview = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: quizzes } = useQuizzes();

  const selectedQuizId = searchParams.get(SELECTED_QUIZ_QUERY_PARAMETER_KEY);

  return (
    <>
      <Header>
        <Button onClick={() => navigate(ROUTES.lobby.players)}>
          👈 Back to lobby
        </Button>

        <Button
          variant="success"
          onClick={() => navigate(ROUTES.quiz.play.route(selectedQuizId!, 0))}
          disabled={!selectedQuizId}
        >
          Start game 🎮
        </Button>
      </Header>

      <div className={styles.quizzesWrapper}>
        {quizzes
          ?.filter(({ slides }) => slides.length > 0)
          .map((quiz) => (
            <QuizzesGridItem
              quiz={quiz}
              onClick={() =>
                setSearchParams([[SELECTED_QUIZ_QUERY_PARAMETER_KEY, quiz.id]])
              }
              selected={selectedQuizId === quiz.id}
              key={quiz.id}
            />
          ))}
      </div>
    </>
  );
};
