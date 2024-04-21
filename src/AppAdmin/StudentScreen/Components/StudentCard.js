import React from "react";
import { PiCirclesFourFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const StudentCard = (props) => {
  const navigate = useNavigate();
  const individualId = props.id;
  function redirect() {
    navigate(`/student-details/`, { state: { individualId } });
  }
  return (
    <div className="w-full md:w-1/2">
      <div className="grid grid-cols-3 py-4">
        <div className="col-span-2 details">
          <figure className="alumni-img w-16 h-16">
            <img src={props.imageUrl} className="w-[100%] h-[100%]" alt="alumni" />
          </figure>
          <div className="ml-5">
            <span className="font-8 f-color-2 text-xs md:text-lg">{props.name}</span>
            <p className="font-1 f-color-1 text-xs">
              {props.department}
            </p>
          </div>
        </div>
        <button className="col-span-1 view-more" onClick={redirect}>
          <PiCirclesFourFill className="i-hover-color text-xl md:text-4xl mr-2 md:mr-8" />
          <span className="t-hover-color font-2 md:mr-8">more</span>
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
