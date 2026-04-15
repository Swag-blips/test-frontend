import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RootLayout } from "../components/layout/RootLayout";


const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const PostDetailsPage = lazy(() =>
  import("../pages/PostDetailsPage").then((module) => ({
    default: module.PostDetailsPage,
  })),
);

const PageLoader = () => (
  <div className="flex justify-center flex-col items-center p-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
    <span className="mt-4 text-slate-500">Loading page...</span>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "posts/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PostDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
