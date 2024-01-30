import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./pages/Game";
import { Intro } from "./pages/Intro";
import { LobbyPage } from "./pages/LobbyPage";
import { Winner } from "./pages/Winner";
import { ROUTES } from "./routes";

function App() {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Intro />,
    },
    {
      path: ROUTES.lobby,
      element: <LobbyPage />,
    },
    {
      path: ROUTES.game.pattern,
      element: <Game />,
    },
    {
      path: ROUTES.winner,
      element: <Winner />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
