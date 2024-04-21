import { getAuth } from "firebase/auth";
import React from "react";
import { useLocation } from "react-router-dom";
import AlumniEditProfile from "./components/AlumniEditProfile";
import StudentEditProfile from "./components/StudentEditProfile";
import { useUserContext } from "../../Config/Context/UserProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EditProfile = () => {

    const location = useLocation();

    const userType = location.state ? location.state.userType : null;

    const auth = getAuth();

    // const user = auth.currentUser;

    const { user } = useUserContext();
console.log("user in profile edit page",user);
console.log("userType in profile edit page",userType);
console.log("auth in profile edit page",auth);
  return (
    <>
      <div className="pt-10">
        {user ? (
          // {
          userType === "alumni" ? (
            <AlumniEditProfile />
          ) : (
            <StudentEditProfile />
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
  );
};

export default EditProfile;
