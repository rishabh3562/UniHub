import React, { useEffect, useState } from "react";
import CarouselCard from "./components/CarouselCard";
import { CiSearch } from "react-icons/ci";
import AllSeniors from "./components/AllSeniors";
import { db } from "../../Config/Firebase/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Alumnus = () => {
  const [alumniData, setAlumniData] = useState([]);

  useEffect(() => {
    const fetchAlumniData = async () => {
      const usersCollection = collection(db, "users");
      const aumniQuery = query(
        usersCollection,
        where("userType", "==", "alumni")
      );
      const alumniSnapshot = await getDocs(aumniQuery);
      const alumniData = alumniSnapshot.docs.map((doc) => doc.data());
      setAlumniData(alumniData);
    };

    fetchAlumniData();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const filteredAlumni = alumniData.filter((alumni) =>
    alumni.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const headerSkeleton = (
    <>
      <div className="col-span-1">
        <Skeleton height={40} width={300} />
        <Skeleton height={20} width={150} />
      </div>
    </>
  );

  const allSeniorsSkeleton = (
    <div className="grid grid-cols-1">
      <div className="mt-4">
        <Skeleton
          style={{ width: "100%", height: "100%" }}
          className="mb-4"
          count={3}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 px-6 pb-8 pt-24">
        {alumniData.length === 0 ? (
          headerSkeleton
        ) : (
          <div className="col-span-1">
            <h1 className="text-4xl md:text-6xl font-6 f-color-1">
              Meet our <span className="f-color-3">Stars</span>
            </h1>
            <p className="text-sm md:text-lg font-1 f-color-1">
              Spotlight alumni of our campus
            </p>
          </div>
        )}
        <div className="container md:col-span-1">
          {filteredAlumni.length === 0 ? (
            <div className="grid grid-cols-1">
              <div className="mt-4">
                <Skeleton height={360} />
              </div>
            </div>
          ) : (
            <CarouselCard AlumniDataProps={filteredAlumni} />
          )}
        </div>
        <div className="container md:col-span-1 flex justify-center align-middle py-16">
          {filteredAlumni.length === 0 ? (
            <Skeleton
               height="60px" width="100%"
            />
          ) : (
            <div className="flex">
              <div className="absolute p-3 bg-color-3 rounded-full mt-2 md:mt-0 md:ml-[-10px]">
                <CiSearch className="text-4xl md:text-3xl" />
              </div>
              <input
                type="text"
                className="px-16 py-4 md:py-3.5 mt-2 md:mt-0 border-dashed border-2 rounded-full bg-color-4"
                placeholder="Search alumni from feed"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="container md:col-span-1">
          {filteredAlumni.length === 0 ? (
            allSeniorsSkeleton
          ) : (
            <AllSeniors AlumniDataProps={filteredAlumni} />
          )}
        </div>
      </div>
    </>
  );
};

export default Alumnus;
