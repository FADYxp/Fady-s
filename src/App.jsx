import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Contact from "./Components/Contact/Contact";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
