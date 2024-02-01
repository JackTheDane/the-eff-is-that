import { Button } from "../../../components/Button";
import {
  gameLobbyStoreActions,
  useGameLobbyStore,
} from "../hooks/useGameLobbyStore";

export const ResetAllScoresButton = () => {
  const { players } = useGameLobbyStore();
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
            gameLobbyStoreActions.score.resetAll();
          }
        }}
      >
        ♻ Reset scores
      </Button>
    </div>
  );
};
