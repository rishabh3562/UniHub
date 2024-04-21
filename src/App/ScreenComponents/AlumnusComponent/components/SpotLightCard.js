import React, {useState} from "react";
import "../../../../AppStyles/colors.css";
import "../../../../AppStyles/global.css";
import "../../../../AppStyles/alumnus.css";
import { PiCirclesFourFill } from "react-icons/pi";
import { MdWorkspacesFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SpotLightCard = (props) => {

  const navigate = useNavigate();
  const individualId = props.all.id;

  const redirect = () => {
    navigate(`/view-alumni-individual/`, {state: {individualId}});
  }

  return (
    <div className="carousel-item w-full md:w-1/2">
      <div className="bg-color-2 w-[100%] md:w-[100%] h-[100%] p-3 rounded-lg grid grid-cols-3 ">
        <figure className="col-span-3 md:col-span-1 alumni">
          <img
            src={props.image}
            className="rounded-lg w-full h-full"
            alt="alumni"
          />
        </figure>
        <div className="col-span-3 md:col-span-2">
          <div className="flex flex-col w-full h-full px-2 pt-3 md:pt-0">
            <div className="passout h-[20%]">
              <p className="text-end font-2 f-color-4 text-[0.6rem] md:text-xs">
                Pass out @{props.passoutYear}
              </p>
            </div>
            <div className="intro h-[50%]">
              <div className="py-2 md:py-4 lg:py-5">
                <p className="font-2 f-color-4 text-[0.6rem] md:text-xs">
                  Alumni of {props.department} department
                </p>
                <span className="font-8 f-color-4 text-xl lg:text-3xl">
                  {props.name}
                </span>
              </div>
            </div>
            <div className="more h-[30%] flex justify-between align-middle">
              <div className="">
                <p className="font-2 f-color-4 text-[0.6rem] md:text-xs flex gap-2">
                  <MdWorkspacesFilled />
                  {props.designation}
                </p>
              </div>
              <button
                className="btn btn-sm sm:btn-sm md:btn-sm lg:btn-md btn-hover"
                onClick={redirect}
              >
                <PiCirclesFourFill className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotLightCard;
