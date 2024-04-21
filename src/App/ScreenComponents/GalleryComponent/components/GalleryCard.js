import React from "react";
import moment from "moment";

const GalleryCard = (props) => {
  
  return (
    <>
      <div className="">
        <div className="flex justify-center">
          <div className="rounded-3xl bg-color-4">
            <div className="flex justify-start align-middle gap-4 mb-6">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={props.userimage}
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="f-color-2 font-6 text-lg">{props.username}</p>
                <p className="f-color-5 text-xs">
                  Posted by {moment(props.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <div className="my-3">
              <p className="f-color-5 text-sm">{props.title}</p>
            </div>
            <a href={props.imageUrl} download={`UniHub_memory_${props.title}`}>
              <figure className="galler-img">
                <img className="" src={props.imageUrl} alt="" />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryCard;
