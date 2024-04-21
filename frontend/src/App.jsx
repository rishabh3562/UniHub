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
    
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <RouterProvider router={router} />
    </SkeletonTheme>
  </>
  );
}

export default App;
