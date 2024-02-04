import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import styles from "./Home.module.scss";
import soundClip from "../assets/what-is-that.mp3";
import { useRef } from "react";
import { ROUTES } from "../routes";

export const Home = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className={styles.home}>
      <audio ref={audioRef}>
        <source src={soundClip} />
      </audio>

      <h1>What the EFF is that?!</h1>
      <Button
        size="large"
        onClick={() => {
          audioRef?.current?.play();
        }}
      >
        🔊
      </Button>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Button
          variant="success"
          size="large"
          onClick={() => navigate(ROUTES.lobby)}
        >
          Create lobby
        </Button>
        <Button onClick={() => navigate(ROUTES.quiz.overview)}>
          View quizzes
        </Button>
      </div>
    </div>
  );
};
