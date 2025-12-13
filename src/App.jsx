import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Contact from "./Components/Contact/Contact";
import TestMySkills from "./Components/Skills/TestMySkills";

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
        { path: "skills", element: <TestMySkills /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
