import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PlayerCardProps } from "./components/PlayerCard";
import { PlayerInfo } from "./models/PlayerInfo";
import { Game } from "./pages/Game";
import { Intro } from "./pages/Intro";
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
