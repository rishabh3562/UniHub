// ------------------------------------------------------
// Prerequisites
// ------------------------------------------------------
import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../App/Config/Firebase/firebase-config";
// ------------------------------------------------------
// Styles
// ------------------------------------------------------
import "../../AppStyles/global.css";
import "../../AppStyles/colors.css";
// ------------------------------------------------------
// UI Components
// ------------------------------------------------------
import NavigationBar from "../NavigationBar";
import DahboardCards from "./Components/DahboardCards";
import BrandSVG from "../../App/assets/UniHub.png";
import { useUserContext } from "../../App/Config/Context/UserProvider";

const Dashboard = () => {


  const [alumnusCount, setAlumnusCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [rfmwCount, setRfmwCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {

        const alumnusCollection = collection(db, "users");
        const alumnusQuery = query(alumnusCollection, where("userType", "==", "alumni"));
        const alumnusDocs = await getDocs(alumnusQuery);
        const alumnusCount = alumnusDocs.size;
        setAlumnusCount(alumnusCount);

        const studentsCollection = collection(db, "users");
        const studentsQuery = query(studentsCollection, where("userType", "==", "student"));
        const studentsDocs = await getDocs(studentsQuery);
        const studentsCount = studentsDocs.size;
        setStudentsCount(studentsCount);

        const rfmwCollection = collection(db, "rfmw");
        const rfmwQuery = query(rfmwCollection, where("isDeleted", "==", false));
        const rfmwDocs = await getDocs(rfmwQuery);
        const rfmwCount = rfmwDocs.size;
        setRfmwCount(rfmwCount);

        const galleryCollection = collection(db, "gallery");
        const galleryQuery = query(galleryCollection, where("isDeleted", "==", false));
        const galleryDocs = await getDocs(galleryQuery);
        const galleryCount = galleryDocs.size;
        setPhotosCount(galleryCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);


  return (
    <>
      <NavigationBar />
      <div className="grid grid-cols-2 pt-20">
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            Admin <span className="f-color-3">Dashboard</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            Hey admin! lets check what's going on
          </p>
        </div>
        <div className="col-span-2 md:col-span-1 flex flex-wrap justify-evenly align-middle mt-8 px-5 md:px-2">
          <DahboardCards
            alumnusCount={alumnusCount}
            studentsCount={studentsCount}
            rfmwCount={rfmwCount}
            photosCount={photosCount}
          />
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-center align-middle mt-10 md:mt-[20%] mb-10 md:mb-0 px-5 md:px-8">
          <figure className="h-[50%] w-[60%]">
            <img src={BrandSVG} alt="brand-svg" />
            <figcaption>
              <p className="text-xs text-center mt-4 md:text-lg font-1 f-color-3">
                Let's Connect the generations in one platform
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
