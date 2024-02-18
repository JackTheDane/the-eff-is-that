import { useCallback, useEffect } from "react";
import { useGameLobbyStore } from "../features/gameLobby/hooks/useGameLobbyStore";

export const useNativeBeforeUnloadWarning = () => {
  const { players } = useGameLobbyStore();

  const hasPlayers = players.length > 0;

  const beforeUnloadCallback = useCallback(
    (event: BeforeUnloadEvent) => {
      if (!hasPlayers) {
        return;
      }

      event.preventDefault();

      event.returnValue = "true";
    },
    [hasPlayers]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadCallback);
    return () =>
      window.removeEventListener("beforeunload", beforeUnloadCallback);
  }, [beforeUnloadCallback]);
};
