import React, {useEffect, useState} from "react";
import NavigationBar from "../NavigationBar";
import { IoMailOpen } from "react-icons/io5";
import "../../AppStyles/viewAlumni.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";
import { useLocation } from "react-router-dom";

const DetailsStudent = () => {
  const location = useLocation();
  const individualId = location.state?.individualId;

  const [studentData, setStudentData] = useState(null);
  

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentRef = collection(db, "users");
      const q = query(studentRef, where("id", "==",individualId ))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setStudentData(doc.data());
      })
      // console.log(querySnapshot.docs[0].data());
    }
    fetchStudentData();
  },[individualId])

  return (
    <>
      <NavigationBar />
      {studentData && (
      <div className="grid grid-cols-3 pt-20">
        <div className="col-span-3 lg:col-span-1 mt-10 px-6">
          <figure className="alumni-image">
            <img src={studentData.imageUrl} alt="alumni-image" />
          </figure>
        </div>
        <div className="col-span-3 lg:col-span-2 mt-5 lg:mt-10  px-6">
          <div className="mt-5 w-[100%] h-[100%] ">
            <span className="font-8 f-color-7 text-2xl lg:text-4xl uppercase">
              {studentData.name}
            </span>
            <p className="font-1 f-color-5 text-sm lg:text-md">{studentData.currentYear}</p>
            <p className="font-4 f-color-3 mt-4">
              {studentData.department}
            </p>
            <span className="f-color-6">Contact No. : {studentData.phone}</span><br />
            <a href={`mailto:${studentData.email}`} className="join-meet h-16 w-[100%] md:w-[30%] rounded-full btn mt-8 md:mx-2">
              <IoMailOpen className="f-color-4 -mt-2" size={25} />
              <span className="font-8 f-color-4 text-lg lg:text-xl">Mail</span>
            </a>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default DetailsStudent;
