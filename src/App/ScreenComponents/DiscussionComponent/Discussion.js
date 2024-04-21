import React, { useState, useEffect } from "react";
import { TfiWrite } from "react-icons/tfi";
import DiscussionCluster from "./components/DiscussionCluster";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Config/Firebase/firebase-config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Discussion = () => {
  const navigate = useNavigate();
  const [discussiionData, setDiscussionData] = useState([]);

  function addPost() {
    navigate("/discussion/add-post");
  }

  useEffect(() => {
    const fetcDiscussionData = async () => {
      const discussionCollection = collection(db, "discussions");
      const discussionDocs = await getDocs(
        query(discussionCollection, orderBy("createdAt", "desc"))
      );
      const allDiscussionData = discussionDocs.docs.map((doc) => doc.data());
      setDiscussionData(allDiscussionData);
    };

    fetcDiscussionData();
  }, []);

  const floatingButtonStyle = {
    position: "fixed",
    bottom: "20px", 
    right: "20px", 
    zIndex: 1000,
  };

  return (
    <>
      <div className="grid grid-cols-4 px-6 pb-8 pt-24">
        <div className="col-span-4">
          {discussiionData.length === 0 ? (
            <>
              <Skeleton className="h-[40px]" style={{ width: "50%" }} />
              <Skeleton className="h-[20px]" style={{ width: "40%" }} />
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-6 f-color-1">
                Discussion <span className="f-color-3">Forum</span>
              </h1>
              <p className="text-sm md:text-lg font-1 f-color-1">
                Discuss any topic in community and spread knowledge
              </p>
            </>
          )}
        </div>
        <div className="col-span-4">
          <div
            className="btns font-6 flex flex-wrap gap-6 md:gap-10 justify-center align-middle mt-8"
            style={floatingButtonStyle}
          >
            <div className="cat-hov">
              {discussiionData.length === 0 ? (
                <div className="w-[100%] flex justify-start align-middle gap-6 md:gap-10">
                  <Skeleton height={60} width={60} circle={true} />
                </div>
              ) : (
                <button
                  className="rounded-full bg-color-3 flex text-center p-5 mx-2 backdrop-blur-md"
                  onClick={addPost}
                >
                  <TfiWrite size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
        <div className="col-span-4 lg:col-span-2">
          <div className="flex flex-col mt-8 ">
            {discussiionData.length === 0 ? (
              <Skeleton className="mt-8 mb-5" height={400} count={4} />
            ) : (
              <DiscussionCluster discussionDataProps={discussiionData} />
            )}
          </div>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
      </div>
    </>
  );
};

export default Discussion;
