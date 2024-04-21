import React from "react";
import moment from "moment";
import { CgMoreVerticalAlt } from "react-icons/cg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DiscussionCard = (props) => {
  return (
    <div className="my-3">
      <div className="w-[100%] py-6">
        <div className="flex justify-between align-middle">
          <div className="flex justify-start align-middle gap-2">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img
                  src={props.userImage}
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <div className="mt-2 md:mt-1">
              <p className="font-5 f-color-2 text-md md:text-lg">
                {props.userName}
              </p>
              <p className="font-2 f-color-5 text-xs">
                {moment(props.createdAt).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="font-2 f-color-2 my-6">
          <div
            dangerouslySetInnerHTML={{ __html: props.delta }} // Render the HTML content
          />
        </div>
        <hr
          className="w-full border-dashed"
          style={{ borderTop: "1px dashed #F67E7D" }}
        />
      </div>
    </div>
  );
};

export default DiscussionCard;
