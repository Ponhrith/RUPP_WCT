import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./views/pages/HomePage";
import ContactPage from "./views/pages/ContactPage";
import AboutDummyPage from "./views/pages/AboutDummyPage";
import SamplePostDummyPage from "./views/pages/SamplePostDummyPage";

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
    {
      path: "/about",
      element: <AboutDummyPage />,
    },
    {
      path: "/samplepost",
      element: <SamplePostDummyPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
