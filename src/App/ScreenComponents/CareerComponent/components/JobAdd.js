import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { getCurrentUserData } from "../../../../utils/firebaseapi/getCurrentUserData";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../Config/Firebase/firebase-config";
import { v4 as uuidv4 } from "uuid";

const JobAdd = () => {
  const user = auth.currentUser;

  const [referrerData, setReferrerData] = useState(null);
  const [userData, setUserData] = useState([]);

  const [jobTitle, setJobTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDomain, setJobDomain] = useState("");
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem("isLoading") === "true" ? true : false
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDataValue = await getCurrentUserData(user);
          setUserData(userDataValue);
          // setIsLoading(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserData();
  }, [user, setUserData]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const data = await getCurrentUserData(user);
          setReferrerData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [user, setReferrerData]);

  const handleCloseModal = () => {
    const modalElement = document.getElementById("my_modal_5");
    modalElement.close();
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (
      !jobTitle ||
      !organization ||
      !location ||
      !stipend ||
      !jobDescription ||
      !jobDomain
    ) {
      setIsMessageEmpty(true);
      return;
    }
    try {
      const jobCollection = collection(db, "jobs");
      const jobDoc = doc(jobCollection);
      await setDoc(jobDoc, {
        id: uuidv4(),
        userid: user.uid,
        referrerName: referrerData.name,
        referrerEmail: referrerData.email,
        referrerImage: referrerData.imageUrl,
        jobTitle,
        organization,
        location,
        stipend,
        jobDescription,
        jobDomain,
        postedOn: new Date().toISOString(),
      });
      handleCloseModal();
      window.location.reload();
      setIsLoading(false);
      console.log("Job added successfully");
    } catch (error) {}
  };

  return (
    <>
      <div className="cat-hov">
        {userData.userType === "alumni" || userData.userType === "admin" ? (
          <>
            <button
              className="rounded-full bg-color-3 flex text-center p-5 mx-2"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <IoMdAdd size={20} />
            </button>
            <p className="pt-6 text-center font-2 f-color-2 text-sm md:text-md">
              Add opening
            </p>
          </>
        ) : null}
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
                Post Oppurtunities for Juniors
              </h3>
              <input
                type="text"
                id="titleoffile"
                placeholder="enter position"
                className="col-span-1 py-4 mt-3 bg-color-7 border-hidden placeholder-color-text font-3"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="enter organization name"
                  className="col-span-1 py-4 mt-3 bg-color-7 border-hidden placeholder-color-text font-3"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="enter location"
                  className="col-span-1 py-4 mt-3 bg-color-7 border-hidden placeholder-color-text font-3"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="enter stipened amount"
                  className="col-span-1 py-4 mb-3 bg-color-7 border-hidden placeholder-color-text font-3"
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                />
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="enter domain"
                  className="col-span-1 py-4 mb-3 bg-color-7 border-hidden placeholder-color-text font-3"
                  value={jobDomain}
                  onChange={(e) => setJobDomain(e.target.value)}
                />
              </div>
              <textarea
                rows="4"
                type="text"
                id="titleoffile"
                placeholder="enter job description (provide email address for further communication)"
                className="py-4 mt-0 mb-6 bg-color-7 font-2 border-hidden placeholder-color-text w-[100%] rounded-xl font-3"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {isMessageEmpty && (
                <p className="text-red-500 text-center mb-5">
                  Fields cannot be empty
                </p>
              )}
              <button
                for="uploadfile"
                className="bg-color-4 w-full f-color-1 p-3 rounded-xl font-6 "
                onClick={handleAddJob}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-dots loading-md"></span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default JobAdd;
