import React from "react";
import { PiCirclesFourFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import ScheduleEventModal from "./ScheduleEventModal";

const RFMWCard = (props) => {
  const navigate = useNavigate();

  function redirectMentorProfile() {
    navigate(`/alumni-details/`, { state: { individualId: props.mentorid } });
  }

  function redirectRequestSenderProfile() {
    navigate(`/student-details/`, { state: { individualId: props.userid } });
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 my-4">
      <div className="grid grid-cols-3 py-4">
        <div className="col-span-2 details">
          <figure
            className="alumni-img cursor-pointer  w-16 h-16"
            onClick={redirectRequestSenderProfile}
          >
            <img src={props.userimgurl} className="w-[100%] h-[100%]" alt="alumni" />
          </figure>
          <div className="ml-5">
            <span className="font-8 f-color-2 text-lg">{props.username}</span>
            <p
              className="font-1 f-color-6 text-xs cursor-pointer"
              onClick={redirectMentorProfile}
            >
              requested <span className="f-color-7">{props.mentorname}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 min-h-[20rem] rounded-md border-gray-500 py-5 px-1 md:px-5 md:mr-8">
        <p className="font-1 f-color-6 text-sm">{props.message}</p>
      </div>
      <ScheduleEventModal allData={props} />
    </div>
  );
};

export default RFMWCard;
