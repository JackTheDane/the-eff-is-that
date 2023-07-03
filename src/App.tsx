import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Game } from "./pages/Game";
import { Intro } from "./pages/Intro";
import { LobbyPage } from "./pages/LobbyPage";
import { Winner } from "./pages/Winner";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Intro />,
    },
    {
      path: "/game",
      element: <Game />,
    },
    {
      path: "/winner",
      element: <Winner />,
    },
    {
      path: "/lobby",
      element: <LobbyPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
