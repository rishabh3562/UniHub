import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import { BiLogoLinkedin } from "react-icons/bi";
import { IoMailOpen } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import "../../AppStyles/viewAlumni.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";
import { useLocation } from "react-router-dom";

const DetailsAlumni = () => {

  const location = useLocation();

  const individualId = location.state?.individualId;
  

  const [alumniData, setAlumniData] = useState(null);

  useEffect(() => {
    const fetchAlumniData = async () => {
      const alumniRef = collection(db, "users");
      const q = query(alumniRef, where("id", "==",individualId ))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAlumniData(doc.data());
      })
      // console.log(querySnapshot.docs[0].data());
    }
    fetchAlumniData();
  },[individualId])

  function linkedinRedirect(){
    window.open(alumniData.linkedinUrl, "_blank");
  }

  function twitterRedirect(){
    window.open(alumniData.twitterUrl, "_blank");
  }


  return (
    <>
      <NavigationBar />
      {alumniData && (
      <div className="grid grid-cols-3 pt-20">
        <div className="col-span-3 lg:col-span-1 mt-10 px-6">
          <figure className="alumni-image">
            <img src={alumniData.imageUrl} alt="alumni-image" />
          </figure>
        </div>
        <div className="col-span-3 lg:col-span-2 mt-5 lg:mt-10  px-6">
          <div className="mt-5 w-[100%] h-[100%] ">
            <span className="font-8 f-color-7 text-2xl lg:text-4xl uppercase">
              {alumniData.name}
            </span>
            <p className="font-1 f-color-5 text-sm lg:text-md">Passout @{alumniData.passoutYear}</p>
            <p className="font-4 f-color-3 mt-4">{alumniData.designation}</p>
            <span className="f-color-6">
              {alumniData.description}
            </span>
          </div>
          <div className="flex justify-start align-baseline w-[100%] flex-col md:flex-row">
            <div className="links gap-5">
              <button
                className="social w-16 h-16 rounded-full p-5 text-center"
                onClick={() => linkedinRedirect()}
              >
                <BiLogoLinkedin className="f-color-4 " size={25} />
              </button>
              <button
                className="social w-16 h-16 rounded-full p-5 text-center"
                onClick={() => twitterRedirect()}
              >
                <RiTwitterXFill className="f-color-4 " size={25} />
              </button>
              <a href={`mailto:${alumniData.email}`} className="join-meet h-16 w-[50%] md:w-[100%] rounded-full btn md:mx-2"
              >
                <IoMailOpen className="f-color-4 -mt-2" size={25} />
                <span className="font-8 f-color-4 text-lg lg:text-xl">
                  Mail
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default DetailsAlumni;
