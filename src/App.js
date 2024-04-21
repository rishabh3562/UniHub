// ------------------------------------------------------
// Prerequisites
// ------------------------------------------------------
import React, { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./App/Routes/RootLayout";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import 'dotenv/config';

// ------------------------------------------------------
// user Screen components
// ------------------------------------------------------
import HeroPage from "./App/ScreenComponents/HeroPage";
import Login from "./App/ScreenComponents/UserEntryComponents/Login";
import Signup from "./App/ScreenComponents/UserEntryComponents/Signup";
import Alumnus from "./App/ScreenComponents/AlumnusComponent/Alumnus";
import ViewProfile from "./App/ScreenComponents/AlumnusComponent/ViewProfile";
import Gallery from "./App/ScreenComponents/GalleryComponent/Gallery";
import AllWebiner from "./App/ScreenComponents/WebinerComponent/AllWebiner";
import Career from "./App/ScreenComponents/CareerComponent/Career";
import Profile from "./App/ScreenComponents/UserProfileComponent/Profile";
import EditProfile from "./App/ScreenComponents/UserProfileComponent/EditProfile";
import Discussion from "./App/ScreenComponents/DiscussionComponent/Discussion";
import UpdateProfile from "./App/ScreenComponents/UserProfileComponent/UpdateProfile";
// ------------------------------------------------------
// Admin Screen components
// ------------------------------------------------------
import AdminLogin from "./AppAdmin/AdminEntryScreen/AdminLogin";
import Dashboard from "./AppAdmin/DashboardScreen/Dashboard";
import Students from "./AppAdmin/StudentScreen/Students";
import DetailsStudent from "./AppAdmin/StudentScreen/DetailsStudent";
import Alumni from "./AppAdmin/AlumniListScreen/Alumni";
import DetailsAlumni from "./AppAdmin/AlumniListScreen/DetailsAlumni";
import AllPhotos from "./AppAdmin/GalleryScreen/AllPhotos";
import AllRfmw from "./AppAdmin/RFMWs/AllRfmw";
import AddPost from "./App/ScreenComponents/DiscussionComponent/AddPost";
// ------------------------------------------------------
// Web Routes
// ------------------------------------------------------
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile-edit",
        element: <EditProfile />,
      },
      {
        path: "/profile-update",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/alumnus",
        element: <Alumnus />,
      },
      {
        path: "/view-alumni-individual",
        element: <ViewProfile />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/all-webiner",
        element: <AllWebiner />,
      },
      {
        path: "/careers",
        element: <Career />,
      },
      {
        path: "/discussion",
        element: <Discussion />,
      },
      {
        path: "/discussion/add-post",
        element: <AddPost />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "/admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/studentlist",
        element: <Students />,
      },
      {
        path: "/student-details",
        element: <DetailsStudent />,
      },
      {
        path: "/alumnilist",
        element: <Alumni />,
      },
      {
        path: "/alumni-details",
        element: <DetailsAlumni />,
      },
      {
        path: "/all-photos",
        element: <AllPhotos />,
      },
      {
        path: "/all-rfmw",
        element: <AllRfmw />,
      },
    ],
  },
]);

function App() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <RouterProvider router={router} />
    </SkeletonTheme>
  );
}

export default App;
