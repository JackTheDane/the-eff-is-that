import { Button } from "../../../components/Button";
import { gameLobbyActions, useGameLobby } from "../hooks/useGameLobby";

export const ResetAllScoresButton = () => {
  const { players } = useGameLobby();
  const playerHasScore = players.some(({ score }) => score > 0);

  if (!playerHasScore) {
    return null;
  }

  return (
    <div>
      <Button
        variant="danger"
        onClick={() => {
          if (window.confirm("Reset all scores?")) {
            gameLobbyActions.score.resetAll();
          }
        }}
      >
        ♻ Reset scores
      </Button>
    </div>
  );
};
