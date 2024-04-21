import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import { CiSearch } from "react-icons/ci";
import AlumniCluster from "./Components/AlumniCluster";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";

const Alumni = () => {

  const [AlumniData, setAlumniData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  

  useEffect(() => {
    const fetchAlumniData = async () => {
      const alumniCollection = collection(db, "users");
      const alumniQuery = query(alumniCollection, where("userType", "==", "alumni"));
      const alumniSnapshot = await getDocs(alumniQuery);
      const alumniData = alumniSnapshot.docs.map((doc) => doc.data());
      setAlumniData(alumniData);
    }
    fetchAlumniData();
  },[])

  const filteredAlumni = AlumniData.filter((alumni) =>
    alumni.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <NavigationBar />
      <div className="grid grid-cols-2 pt-20">
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            See All <span className="f-color-3">Alumnus</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            Let's check all alumnus
          </p>
        </div>
        <div className="col-span-2 mt-8 px-5 md:px-6">
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
        </div>
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <AlumniCluster AlumniDataProps={filteredAlumni} />
        </div>
      </div>
    </>
  );
};

export default Alumni;
