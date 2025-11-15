import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import ShoppingPage from "./pages/ShoppingPage";
import SummaryPage from "./pages/SummaryPage";
import VideoPage from "./pages/VideoPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "/", element: <ShoppingPage /> },
              { path: "/summary", element: <SummaryPage /> },
              { path: "/product/:id/video", element: <VideoPage /> },
              { path: "/confirmation", element: <ConfirmationPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
