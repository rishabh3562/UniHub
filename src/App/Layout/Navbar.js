import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import logo1 from "../assets/logo.png";
// import logo2 from "../Constants/userDp.svg";
import "../../AppStyles/global.css";
import { auth } from "../Config/Firebase/firebase-config";
import { getCurrentUserData } from "../../utils/firebaseapi/getCurrentUserData";
import { useUserContext } from "../Config/Context/UserProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PiGraduationCap } from "react-icons/pi";
import { RiVideoChatLine } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsImages } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";

const Navbar = () => {
  const navigate = useNavigate();

  // const user = auth.currentUser;
  const { user } = useUserContext();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(false);
      if (user) {
        try {
          const userDataValue = await getCurrentUserData(user);
          setUserData(userDataValue);
          setIsLoading(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserData();
  }, [user, setUserData]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileRedirect = () => {
    navigate("/profile");
  };

  const handleMenuRedirect = (pagePath) => {
    // Close the modal dialog
    const modal = document.getElementById("my_modal_4");
    if (modal) {
      modal.close();
    }

    // Navigate to the new page
    navigate(pagePath);
  };


  return (
    <>
      <div className="navbar bg-color-4 md:px-3 pt-4 fixed z-50">
        <div className="flex-1">
          <Link to="/alumnus" className="btn btn-ghost normal-case text-xl">
            {isLoading ? (
              <img src={logo1} className="h-[3rem] w-[3rem]" alt="Logo" />
            ) : (
              <Skeleton width={48} height={48} />
            )}
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div
            className="visible md:hidden bg-color-4 mr-4"
            onClick={() => window.my_modal_4.showModal()}
          >
            {isLoading ? (
              <HiMenuAlt3 className="f-color-3 text-3xl" />
            ) : (
              <Skeleton width={24} height={24} />
            )}
          </div>
          <dialog id="my_modal_4" className="modal backdrop-blur-2xl">
            <form method="dialog" className="modal-box bg-color-4 menu">
              <div className="flex justify-between align-middle">
                <p className="font-8 f-color-3 text-2xl mt-4 pl-8">MENU</p>
                <div className="modal-action">
                  <button className="btn btn-ghost f-color-3 -mt-3 rounded-full">X</button>
                </div>
              </div>
              <ul className="flex flex-col px-1 gap-4">
                <li className="px-3 pb-2">
                  <a onClick={() => handleMenuRedirect('/alumnus')} className="text-hover font-4 text-lg ">
                    <PiGraduationCap className="f-color-2" size={20} />
                    <p className="f-color-2 px-2">Alumnus</p>
                  </a>
                </li>
                <li className="px-3 pb-2">
                  <a onClick={() => handleMenuRedirect('/all-webiner')} className="text-hover font-4 text-lg">
                    <RiVideoChatLine className="f-color-2" size={20} />
                    <p className="f-color-2 px-2">Webiners</p>
                  </a>
                </li>
                <li className="px-3 pb-2">
                  <a onClick={() => handleMenuRedirect('/careers')} className="text-hover font-4 text-lg">
                    <MdOutlineWorkOutline className="f-color-2" size={20} />
                    <p className="f-color-2">Careers</p>
                  </a>
                </li>
                <li className="px-3 pb-2">
                  <a onClick={() => handleMenuRedirect('/gallery')} className="text-hover font-4 text-lg">
                    <BsImages className="f-color-2" size={20} />
                    <p className="f-color-2">Gallery</p>
                  </a>
                </li>
                <li className="px-3 pb-2">
                  <a onClick={() => handleMenuRedirect('/discussion')} className="text-hover font-4 text-lg">
                    <GoCommentDiscussion className="f-color-2" size={20} />
                    <p className="f-color-2">Discussion</p>
                  </a>
                </li>
              </ul>
            </form>
          </dialog>
          <ul className="hidden md:flex justify-center align-middle space-x-8 px-1 ">
            <li className="">
              <Link to="/alumnus" className="text-hover-d font-2">
                Alumnus
              </Link>
            </li>
            <li className="">
              <Link to="/all-webiner" className="text-hover-d font-2">
                Webiners
              </Link>
            </li>
            <li className="">
              <Link to="/careers" className="text-hover-d font-2">
                Careers
              </Link>
            </li>
            <li className="">
              <Link to="/gallery" className="text-hover-d font-2">
                Gallery
              </Link>
            </li>
            <li className="">
              <Link to="/discussion" className="text-hover-d font-2">
                Discussion
              </Link>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded">
                {isLoading ? (
                  <img src={userData?.imageUrl} alt="User DP" />
                ) : (
                  <Skeleton width={40} height={40} className="rounded" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-color-2 rounded-box w-52"
            >
              <li onClick={handleProfileRedirect}>
                <a className="font-2">Profile</a>
              </li>
              <li onClick={handleLogout}>
                <a className="font-2">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
