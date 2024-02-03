import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { QuizzesGrid } from "../features/quiz/components/QuizzesGrid";
import { ROUTES } from "../routes";
import styles from "./QuizzesPage.module.scss";

export const QuizzesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Button onClick={() => navigate(ROUTES.home)}>👈 Back</Button>
      </Header>
      <div className={styles.quizzesWrapper}>
        <QuizzesGrid />
      </div>
    </>
  );
};
