import React, { useState, useEffect } from "react";
import { GoOrganization } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { BiMoney } from "react-icons/bi";
import { getCurrentUserData } from "../../../../utils/firebaseapi/getCurrentUserData";
import { auth } from "../../../Config/Firebase/firebase-config";

const JobCard = (props) => {
  const [userData, setUserData] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUserData(user);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div className="bg-color-10 p-6 my-4 rounded-md">
        <p className="font-6 f-color-2 text-4xl">{props.jobTitle}</p>
        <div className="flex flex-wrap justify-start align-middle gap-1 lg:gap-10 mt-5">
          <div className="flex justify-center align-middle">
            <p className="flex justify-center align-middle f-color-5">
              <GoOrganization size={20} className="mt-1" />
              &nbsp; Organization : &nbsp;
              <span className="f-color-3">{props.organization}</span>
            </p>
          </div>
          <div className="flex justify-center align-middle">
            <p className="flex justify-center align-middle f-color-5">
              <IoLocationOutline size={20} className="mt-1" />
              &nbsp; Location : &nbsp;
              <span className="f-color-3">{props.location}</span>
            </p>
          </div>
          <div className="flex justify-center align-middle">
            <p className="flex justify-center align-middle f-color-5">
              <BiMoney size={20} className="mt-1" />
              &nbsp; Stipened : &nbsp;
              <span className="f-color-3">{props.stipend}</span>
            </p>
          </div>
        </div>
        <p className="mt-5 f-color-2 font-5 text-xl">JOB DESCRIPTION</p>
        <p className="mt-3 font-3 f-color-5">{props.jobDescription}</p>
        <p className="mt-5 font-3 f-color-2">
          Apply with resume & Cover letter
        </p>
        <div className="mt-8 flex justify-start align-middle gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full border-white border-2">
              <img
                src={props.referrerImage}
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
          <p className="mt-2 font-1 f-color-2 text-sm">
            Posted by <br />
            <span className="font-5 f-color-3 text-xl">
              {props.referrerName}
            </span>
          </p>
        </div>
        <div className="flex justify-between align-middle mt-10">
          <p className="font-2 f-color-3">#{props.jobDomain}</p>
          {/* <JobApply
            allData = {props}
          /> */}
          <a
            className="btn bg-color-3 border-none font-7"
            href={`mailto:${props.referrerEmail}?subject=UniHub%20Messege%20:%20Application%20from%20${userData.name}`}
          >
            APPLY
          </a>
        </div>
      </div>
    </>
  );
};

export default JobCard;
