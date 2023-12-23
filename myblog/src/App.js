import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./views/pages/HomePage";
import ContactPage from "./views/pages/ContactPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
