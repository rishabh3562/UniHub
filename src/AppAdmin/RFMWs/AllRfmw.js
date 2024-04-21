import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import RFMWCluster from "./components/RFMWCluster";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";
import { useNavigate } from "react-router-dom";


const AllRfmw = () => {

  const [rfmwData, setRfmwData] = useState([]);
  const [webinarData, setWebinarData] = useState([]);

  useEffect(() => {
    const fetchWebinarData = async () => {
      const webinarCollection = collection(db, "webinar");
      const webinarQuery = query(webinarCollection);
      const webinarSnapshot = await getDocs(webinarQuery);
      const webinarData = webinarSnapshot.docs.map((doc) => doc.data());
      console.log(webinarData);
      setWebinarData(webinarData);
    }
  
    fetchWebinarData();
  }, []);
  
  useEffect(() => {
    const fetchRfmwData = async () => {
      const rfmwCollection = collection(db, "rfmw");
      const rfmwQuery = query(rfmwCollection, orderBy("createdAt", "desc"), where("isDeleted", "==", false));
      const rfmwSnapshot = await getDocs(rfmwQuery);
      const rfmwData = rfmwSnapshot.docs.map((doc) => doc.data());

      // const filteredRfmwData = rfmwData.filter(rfmw => {
      //   return !webinarData.some(webinar => webinar.rfmwId === rfmw.rfmwid);
      // });
  
      // console.log(filteredRfmwData);
      setRfmwData(rfmwData);

    }
  
    fetchRfmwData();
  }, [webinarData]);

  

  return (
    <>
      <NavigationBar />
      <div className="grid grid-cols-2 pt-20">
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            Strudent <span className="f-color-3">Requests</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            Let's check All requests from RFMW forms
          </p>
        </div>
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <RFMWCluster RFMWDataProps={rfmwData} />
        </div>
      </div>
    </>
  );
};

export default AllRfmw;
