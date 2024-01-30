import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import styles from "./Intro.module.scss";
import soundClip from "../assets/what-is-that.mp3";
import { useRef } from "react";
import { ROUTES } from "../routes";

export const Intro = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className={styles.root}>
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
      <Button variant="success" onClick={() => navigate(ROUTES.lobby)}>
        Create lobby
      </Button>
    </div>
  );
};
