import React, { useState } from "react";
import { BiSolidShareAlt } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import Moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventList = (props) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    const inputElement = document.getElementById("copyInput");
    if (inputElement) {
      inputElement.value = props.webinarLink;
  
      inputElement.select();
      inputElement.setSelectionRange(0, 99999);
  
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      } catch (err) {
        console.error("Copy failed: ", err);
      }
    }
  };

  function joinMeet() {
    const eventDateTime = Moment(
      `${props.date} ${props.time}`,
      "YYYY-MM-DD HH:mm"
    );
    if (eventDateTime.isBefore(Moment())) {
      return;
    }
    window.open(props.webinarLink, "_blank");
  }

  const isEventInPast = Moment(
    `${props.date} ${props.time}`,
    "YYYY-MM-DD HH:mm"
  ).isBefore(Moment());

  const copyBtn = copied ? (
    <BsCheckCircle size={20} className="f-color-3" />
  ) : (
    <MdContentCopy size={20} className="f-color-3" />
  );

  return (
    <div className="grid grid-cols-3 mt-0 md:mt-12 py-16 md:py-5 px-6">
      <div className="col-span-3 md:col-span-1">
        <figure className="event-banner ">
          <img
            src={props.thumbnailImageUrl}
            style={{
              filter: isEventInPast ? "grayscale(100%)" : "grayscale(0%)",
            }}
            alt="webinar"
          />
        </figure>
      </div>
      <div className="col-span-3 md:col-span-2 md:pl-5 md:pr-1 lg:pr-3 flex flex-col justify-between">
        <div className="mt-5 md:mt-0">
          <span
            className={`font-8 text-2xl lg:text-4xl ${
              isEventInPast ? "f-color-6" : "f-color-7"
            }`}
          >
            {props.title}
          </span>
          <p className="font-1 f-color-5 text-sm lg:text-md mt-2">
            {props.description}
          </p>
          <p
            className={`font-4 mt-4 ${
              isEventInPast ? "f-color-5" : " f-color-3"
            }`}
          >
            {Moment(props.date).format("DD-MM-YYYY")} ,{" "}
            {Moment(props.time, "HH:mm").format("h:mm A")}
          </p>
        </div>
        <div className="w-[100%] h-[10%] grid grid-cols-2">
          <div className="col-span-2 md:col-span-1 flex justify-start align-middle gap-2">
            <div className="avatar col-span-1 ">
              <div className=" md:w-10 h-10 rounded-full">
                <img src={props.profileImageUrl} />
              </div>
            </div>
            <div className="col-span-5 px-3 md:px-2 lg:px-0">
              <p className="font-1 f-color-5 text-xs">Speaker</p>
              <span className="font-5 f-color-7 md:text-md -pt-2">
                {props.speakerName}
              </span>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex justify-between md:justify-center align-middle mt-6 md:mt-0">
            <div
              onClick={joinMeet}
              // className="join-meet h-[100%] w-[80%] md:w-[40%] rounded-full btn md:mx-2"
              className={`join-meet w-[80%] md:w-[40%] rounded-full md:mx-2 btn ${
                isEventInPast ? "btn-disabled" : ""
              }`}
            >
              <span
                className={`font-8  text-lg lg:text-xl ${
                  isEventInPast ? "f-color-5" : "f-color-4"
                }`}
              >
                JOIN
              </span>
            </div>
            <button
              // className="btn btn-circle share h-[100%] w-[14%] md:w-[25%] lg:w-[10%]"
              className={`btn btn-circle share h-[100%] w-[14%] md:w-[25%] lg:w-[10%] ${
                isEventInPast ? "btn-disabled" : ""
              }`}
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              <BiSolidShareAlt
                className={`${isEventInPast ? "f-color-5" : "f-color-4"}`}
                size={20}
              />
            </button>
            <dialog id="my_modal_3" className="modal backdrop-blur-sm">
              <div className="modal-box bg-color-2">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div className="flex justify-center align-middle gap-4">
                  <input
                    type="text"
                    id="copyInput"
                    placeholder="meet link"
                    value={props.webinarLink}
                    className="text-center w-[80%] py-4 md:py-3.5 mt-2 md:mt-0 border-2 rounded-full bg-color-7 outline-none border-none"
                  />
                  <button
                    type="btn"
                    className="btn  bg-color-7 mt-2 rounded-full"
                    onClick={onCopy}
                  >
                    {copyBtn}
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
