import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./pages/Game";
import { Intro } from "./pages/Intro";
import { LobbyPage } from "./pages/LobbyPage";
import { Winner } from "./pages/Winner";
import { ROUTES } from "./routes";
import { EditQuizPage } from "./pages/EditQuizPage";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Intro />,
    },
    {
      path: ROUTES.quiz.edit.pattern,
      element: <EditQuizPage />,
    },
    {
      path: ROUTES.lobby,
      element: <LobbyPage />,
    },
    {
      path: ROUTES.quiz.play.pattern,
      element: <Game />,
    },
    {
      path: ROUTES.quiz.winner.pattern,
      element: <Winner />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
