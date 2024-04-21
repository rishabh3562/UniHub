import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import { CiSearch } from "react-icons/ci";
import StudentCluster from "./Components/StudentCluster";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentCollection = collection(db, "users");
      const studentQuery = query(studentCollection, where("userType", "==", "student"));
      const studentSnapshot = await getDocs(studentQuery);
      const studentData = studentSnapshot.docs.map((doc) => doc.data());
      setStudentData(studentData);
    }
    fetchStudentData();
  },[])

  const filteredStudent = studentData.filter((student) =>
    student.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      <NavigationBar />
      <div className="grid grid-cols-2 pt-20">
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            See All <span className="f-color-3">Students</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            Let's check All Students
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
              placeholder="Search students"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <StudentCluster StudentDataProps={filteredStudent} />
        </div>
      </div>
    </>
  )
}

export default Students
