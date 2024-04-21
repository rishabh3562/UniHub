import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Config/Context/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Config/Firebase/firebase-config";
import { getCurrentUserData } from "../../../utils/firebaseapi/getCurrentUserData";
import { BiLogoLinkedin } from "react-icons/bi";
import { IoMailOpen } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import GalleryCard from "./components/GalleryCard";
import "../../../AppStyles/gallery.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Profile = () => {
  const { user } = useUserContext();
  // console.log(user.uid)

  const User = auth.currentUser;

  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(false);

      if (user) {
        try {
          const userDataValue = await getCurrentUserData(user);
          setUserData(userDataValue);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserData();
  }, [user, setUserData]);

  const userType = userData.userType;

  function linkedinRedirect() {
    window.open(userData.linkedinUrl, "_blank");
  }

  function twitterRedirect() {
    window.open(userData.twitterUrl, "_blank");
  }

  function emailRedirect() {
    window.open(userData.email, "_blank");
    console.log(userData.email);
  }

  function editProfile() {
    navigate("/profile-update", { state: { userType: userType } });
  }

  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const galleryCollection = collection(db, "gallery");
        const galleryDocs = await getDocs(
          query(
            galleryCollection,
            orderBy("createdAt", "desc"),
            where("isDeleted", "==", false),
            where("userid", "==", User.uid)
          )
        );
        const allImageData = galleryDocs.docs.map((doc) => doc.data());
        setImageData(allImageData);
        // console.log(User);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGalleryData();
  }, [User, setImageData]);

  return (
    <>
      <div>Profile Section</div>
      <div>
        {isLoading ? (
          <Skeleton style={{ width: "100%", height: "100%" }} />
        ) : (
          userData && (
            <div>
              {userData.userType === "alumni" ? (
                <div className="grid grid-cols-3 pt-20">
                  <div className="col-span-3 lg:col-span-1 mt-10 px-6">
                    <figure className="alumni-image">
                      {userData.imageUrl ? (
                        <img src={userData.imageUrl} alt="alumni-image" />
                      ) : (
                        <Skeleton style={{ width: "100%", height: "100%" }} />
                      )}
                    </figure>
                  </div>
                  <div className="col-span-3 lg:col-span-2 mt-5 lg:mt-10  px-6">
                    <button
                      className="social w-12 h-12 rounded-full p-3.5 text-center tooltip"
                      data-tip="Edit Profile"
                      onClick={() => editProfile()}
                    >
                      <AiFillEdit className="f-color-4 " size={18} />
                    </button>
                    <div className="mt-5 w-[100%] h-[100%] ">
                      <span className="font-8 f-color-7 text-2xl lg:text-4xl uppercase">
                        {userData.name}
                      </span>
                      <p className="font-1 f-color-5 text-sm lg:text-md">
                        Passout @{userData.passoutYear}
                      </p>
                      <p className="font-4 f-color-3 mt-4">
                        {userData.designation} @{userData.employeeAt}
                      </p>
                      <span className="f-color-6">{userData.description}</span>
                    </div>

                    <div className="flex justify-start align-baseline w-[100%] flex-col md:flex-row">
                      <div className="links gap-4 flex ">
                        <button
                          className="social w-16 h-16 rounded-full p-5 text-center"
                          onClick={() => linkedinRedirect()}
                        >
                          <BiLogoLinkedin className="f-color-4 " size={25} />
                        </button>
                        <button
                          className="social w-16 h-16 rounded-full p-5 text-center"
                          onClick={() => twitterRedirect()}
                        >
                          <RiTwitterXFill className="f-color-4 " size={25} />
                        </button>
                        <button
                          className="join-meet h-16 w-[50%] md:w-[100%] rounded-full btn md:mx-2"
                          onClick={() => emailRedirect()}
                        >
                          <IoMailOpen className="f-color-4 -mt-2" size={25} />
                          <span className="font-8 f-color-4 text-lg lg:text-xl">
                            Mail
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 mt-56  px-6">
                    <span className="font-5 f-color-3 text-md lg:text-2xl md:px-20 uppercase">
                      Your Uploads
                    </span>
                    <div className="grid md:grid-cols-3 lg:col-span-3 py-10 mx-2 gap-3">
                      {imageData.map((data) => {
                        return <GalleryCard key={data.id} {...data} />;
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 pt-20">
                  <div className="col-span-3 lg:col-span-1 mt-10 px-6">
                    <figure className="alumni-image">
                      <img src={userData.imageUrl} alt="alumni-image" />
                    </figure>
                  </div>
                  <div className="col-span-3 lg:col-span-2 mt-5 lg:mt-10  px-6">
                    <button
                      className="social w-12 h-12 rounded-full p-3.5 text-center tooltip"
                      data-tip="Edit Profile"
                      onClick={() => editProfile()}
                    >
                      <AiFillEdit className="f-color-4 " size={18} />
                    </button>
                    <div className="mt-5 w-[100%] h-[100%] ">
                      <span className="font-8 f-color-7 text-2xl lg:text-4xl uppercase">
                        {userData.name}
                      </span>
                      <p className="font-1 f-color-5 text-sm lg:text-md">
                        {userData.currentYear}
                      </p>
                      <p className="font-4 f-color-3 mt-4">
                        {userData.department}
                      </p>
                      <span className="f-color-6 mb-10">
                        Contact No. : {userData.phone}
                      </span>
                      <br />
                      <p className="f-color-3 mb-10 bg-color-8 p-4 w-[100%] md:w-[40%] mt-10 rounded-md flex justify-start align-middle gap-4">
                        <IoMailOpen className="f-color-3 mt-1" size={18} />
                        {userData.email}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-span-3 lg:col-span-1 px-6"></div> */}
                  <div className="col-span-3 mt-5 lg:mt-10  px-6">
                    <span className="font-5 f-color-3 text-md lg:text-2xl md:px-20 uppercase">
                      Your Uploads
                    </span>
                    <div className="grid md:grid-cols-3 lg:col-span-3 py-10 mx-2 gap-3">
                      {imageData.map((data) => {
                        return <GalleryCard key={data.id} {...data} />;
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Profile;
