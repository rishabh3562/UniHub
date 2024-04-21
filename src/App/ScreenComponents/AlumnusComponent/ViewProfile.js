import React, { useState, useEffect } from "react";
import "../../../AppStyles/viewAlumni.css";
import { BiLogoLinkedin } from "react-icons/bi";
import { IoMailOpen } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Config/Firebase/firebase-config";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../Config/Context/UserProvider";
import { getCurrentUserData } from "../../../utils/firebaseapi/getCurrentUserData";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ViewProfile = () => {
  const { user } = useUserContext();

  const rfmwid = uuidv4();

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem("isLoading") === "true" ? true : false
  );
  const [message, setMessage] = useState("");
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);

  const location = useLocation();
  const [alumniData, setAlumniData] = useState(null);

  const individualId = location.state?.individualId;

  // if(user) {
  //   window.location.href = "/profile";
  // } else {
  //   window.location.href = "/";
  // }

  useEffect(() => {
    const fetchAlumniData = async () => {
      const userRef = collection(db, "users");
      const q = query(userRef, where("id", "==", individualId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAlumniData(doc.data());
      });
    };

    fetchAlumniData();
  }, [individualId]);

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

  const handleCloseModal = () => {
    const modalElement = document.getElementById("my_modal_5");
    modalElement.close();
  };

  const handleRFMWSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (message.trim() === "") {
      setIsMessageEmpty(true);
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        rfmwid: rfmwid,
        userid: userData?.id || "",
        username: userData.name,
        useremail: userData.email,
        userimgurl: userData.imageUrl,
        message: message,
        mentorid: alumniData.id,
        mentorname: alumniData.name,
        mentoremail: alumniData.email,
        mentorcontactno: alumniData.phone,
        mentorimgurl: alumniData.imageUrl,
        isDeleted: false,
        createdAt: Date.now(),
      };
      const rfmwRef = doc(collection(db, "rfmw"));
      await setDoc(rfmwRef, data);
      handleCloseModal();
      setIsLoading(false);
      localStorage.removeItem("isLoading");
      // window.location.reload();
      toast.success("Request sent successfully");
    } catch (error) {
      console.log(error);
    }
  };

  function linkedinRedirect() {
    window.open(alumniData.linkedinUrl, "_blank");
  }

  function twitterRedirect() {
    window.open(alumniData.twitterUrl, "_blank");
  }

  return (
    <>
      <ToastContainer />
      {alumniData && (
        <div className="grid grid-cols-3">
          <div className="col-span-3 lg:col-span-1 mt-28 px-6">
            <figure className="alumni-image">
              <img src={alumniData.imageUrl} alt="alumni-image" />
            </figure>
          </div>
          <div className="col-span-3 lg:col-span-2 mt-5 lg:mt-28  px-6">
            <div className="mt-5 w-[100%] h-[100%] ">
              <span className="font-8 f-color-7 text-2xl lg:text-4xl uppercase">
                {alumniData.name}
              </span>
              <p className="font-1 f-color-5 text-sm lg:text-md">
                Passout @{alumniData.passoutYear}
              </p>
              <p className="font-1 f-color-5 text-sm lg:text-md">
                Alumni of {alumniData.department} department
              </p>
              <p className="font-4 f-color-3 mt-4">{alumniData?.designation} @{alumniData.employeeAt}</p>
              <span className="f-color-6">{alumniData.description}</span>
            </div>
            <div className="flex justify-between align-baseline w-[100%] flex-col md:flex-row">
              <div className="links gap-5">
                <button
                  className="social w-16 h-16 rounded-full p-5 text-center"
                  onClick={() => linkedinRedirect()}
                >
                  <BiLogoLinkedin className="f-color-4 " size={25} />
                </button>
                <a
                  href={`mailto:${alumniData.email}?subject=UniHub%20Messege`}
                  className="social w-16 h-16 rounded-full p-5 text-center"
                >
                  <IoMailOpen className="f-color-4 " size={25} />
                </a>
                <button
                  className="social w-16 h-16 rounded-full p-5 text-center"
                  onClick={() => twitterRedirect()}
                >
                  <RiTwitterXFill className="f-color-4 " size={25} />
                </button>
              </div>
              <div className="mt-8 md:mt-0">
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="join-meet h-[100%] w-[100%] md:w-[100%] rounded-full btn md:mx-2"
                >
                  <span className="font-8 f-color-4 text-lg lg:text-xl">
                    RMFW
                  </span>
                </button>
                <dialog
                  id="my_modal_5"
                  className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
                  onClose={() => setIsMessageEmpty(false)}
                >
                  <div className="modal-box bg-color-2">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                      <h3 className="font-bold text-lg font-8">
                        Request For Mentorship Webinar
                      </h3>
                      <textarea
                        rows="8"
                        type="text"
                        id="titleoffile"
                        placeholder="enter your message"
                        className="py-4 mt-4 mb-6 bg-color-7 border-hidden placeholder-color-text w-[100%] rounded-xl"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      {isMessageEmpty && (
                        <p className="text-red-500 text-center mb-5">
                          Message cannot be empty
                        </p>
                      )}
                      <button
                        htmlfor="uploadfile"
                        className="bg-color-4 w-full f-color-1 p-3 rounded-xl font-6 "
                        onClick={handleRFMWSubmit}
                      >
                        {isLoading ? (
                          <>
                            <span className="loading loading-dots loading-md"></span>
                          </>
                        ) : (
                          <>
                            <span>SEND REQUEST</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
          <div className="col-span-3 lg:col-span-3"></div>
        </div>
      )}
    </>
  );
};

export default ViewProfile;
