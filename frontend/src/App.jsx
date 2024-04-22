import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HeroPage  from "./pages/HeroPage";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HeroPage />,
      }
      
    ],
  },
]);

function App() {
  return (<>
    <ChakraProvider>

    <SkeletonTheme baseColor="#1A2A39" highlightColor="#e50000">
    <RouterProvider router={router} />
    </SkeletonTheme>
    </ChakraProvider>
  </>
  );
}

export default App;
