import React from "react";
import { TbGridDots } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { BsClockHistory } from "react-icons/bs";

const filter = [
  {
    id: "all",
    icon: <TbGridDots size={20} />,
    category: "All Events",
  },
  {
    id: "upcoming",
    icon: <SlCalender size={20} />,
    category: "Upcoming",
  },
  {
    id: "previous",
    icon: <BsClockHistory size={20} />,
    category: "Previous",
  },
];

const FilterEvents = ({ setFilter, activeFilter }) => {
  return (
    <div className="btns font-6 pt-16 flex flex-wrap gap-6 md:gap-10 justify-center">
      {filter.map((filter) => (
        <div key={filter.id} onClick={() => setFilter(filter.id)} className="cat-hov">
          <button className={`rounded-full flex text-center p-5 mx-2 filter-hov ${filter.id === activeFilter ? "active-filter" : ""}`}>
            {filter.icon}
          </button>
          <p className={`pt-6 text-center font-2 ${filter.id === activeFilter ? "f-color-3" : "f-color-2"}`}>
            {filter.category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FilterEvents;
