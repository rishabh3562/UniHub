import { getAuth } from "firebase/auth";
import React from "react";
import { useLocation } from "react-router-dom";
import AlumniUpdateProfile from "./components/AlumniUpdateProfile";
import StudentUpdateProfile from "./components/StudentUpdateProfile";
import { useUserContext } from "../../Config/Context/UserProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UpdateProfile = () => {

    const location = useLocation();

    const userType = location.state ? location.state.userType : null;

    const auth = getAuth();

    // const user = auth.currentUser;

    const { user } = useUserContext();

  return (
    <>
      <div className="pt-10">
      {user ? (
          // {
          userType === "alumni" ? (
            <AlumniUpdateProfile />
          ) : (
            <StudentUpdateProfile />
          )
        ) : (
          <Skeleton
              className="h-[4rem] mb-3 w-[100%] md:w-[20%] mt-5"
              style={{ borderRadius: "40px" }}
              count={10}
            />
        )}
      </div>
    </>
  )
}

export default UpdateProfile
