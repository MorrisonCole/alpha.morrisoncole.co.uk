import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LocaleLayout } from "./layouts/LocaleLayout";
import { HomePage } from "./pages/HomePage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { LifePage } from "./pages/LifePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { i18n } from "./i18n-config";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={`/${i18n.defaultLocale}`} replace />,
  },
  {
    path: "/:lang",
    element: <LocaleLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blog",
        element: <BlogIndexPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogPostPage />,
      },
      {
        path: "life",
        element: <LifePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
