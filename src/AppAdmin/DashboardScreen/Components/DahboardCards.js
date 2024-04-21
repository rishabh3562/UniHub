import React from "react";
import { CardFields } from "./CardFields";
import { BsArrowUpRight } from "react-icons/bs";


const DahboardCards = ({ alumnusCount, studentsCount, rfmwCount, photosCount }) => {
  function redirect(route) {
    window.location.href = route;
  }
  return (
    <>
      {CardFields.map((card) => {
        let count;
        switch (card.title) {
          case "Alumnus":
            count = alumnusCount;
            break;
          case "Students":
            count = studentsCount;
            break;
          case "RFMW":
            count = rfmwCount;
            break;
          case "Photos":
            count = photosCount;
            break;
          default:
            count = 0;
            break;
        }

        return (
          <div
            key={card.key}
            className="bg-color-10 px-2 py-5 w-[100%] md:w-[100%] lg:w-[48%] h-[10rem] md:h-[12rem] mt-2 md:mr-1 md:mt-1 lg:mt-4 rounded-md flex justify-center align-middle"
          >
            <div className="w-[50%] f-color-3">
              {card.icon}
            </div>
            <div className="w-[50%]">
              <div className="text-4xl md:text-4xl font-6 f-color-1 md:mt-8">
                {count}
              </div>
              <div className="f-color-3 font-2">{card.title}</div>
              <div className="mt-5 flex justify-end">
                <button className="btn bg-color-3 border-none font-7" onClick={() => redirect(card.route)}>
                  <BsArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DahboardCards;
