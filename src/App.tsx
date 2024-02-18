import { createHashRouter, RouterProvider } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { LobbyPage } from "./pages/LobbyPage";
import { Winner } from "./pages/Winner";
import { ROUTES } from "./routes";
import { EditQuizPage } from "./pages/EditQuizPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { RootLayout } from "./layouts/RootLayout";
import { LobbyQuizOverview } from "./pages/LobbyQuizOverview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNativeBeforeUnloadWarning } from "./hooks/useNativeBeforeUnloadWarning";

const queryClient = new QueryClient();

function App() {
  useNativeBeforeUnloadWarning();

  const router = createHashRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: ROUTES.home,
          element: <Home />,
        },
        {
          path: ROUTES.quiz.overview,
          element: <QuizzesPage />,
        },
        {
          path: ROUTES.quiz.edit.pattern,
          element: <EditQuizPage />,
        },
        {
          path: ROUTES.lobby.players,
          element: <LobbyPage />,
        },
        {
          path: ROUTES.lobby.quizzes.pattern,
          element: <LobbyQuizOverview />,
        },
        {
          path: ROUTES.quiz.play.pattern,
          element: <Game />,
        },
        {
          path: ROUTES.quiz.winner.pattern,
          element: <Winner />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
