import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { LobbyPage } from "./pages/LobbyPage";
import { Winner } from "./pages/Winner";
import { ROUTES } from "./routes";
import { EditQuizPage } from "./pages/EditQuizPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { RootLayout } from "./layouts/RootLayout";
import { LobbyQuizOverview } from "./pages/LobbyQuizOverview";

function App() {
  const router = createBrowserRouter([
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

  return <RouterProvider router={router} />;
}

export default App;
