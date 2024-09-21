import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import PackageDetailPage from "./pages/PackageDetailPage";
import Layout from "./Layout";
import SearchPage from "./pages/SearchPage";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  const queryClient = new QueryClient();

  // Router configuration for the application
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/package/:name/:version?",
          element: <PackageDetailPage />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <RouterProvider router={appRouter} />
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
