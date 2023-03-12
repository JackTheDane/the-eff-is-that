import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Game } from "./pages/Game";
import { Intro } from "./pages/Intro";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />
  },
  {
    path: '/game',
    element: <Game />
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
