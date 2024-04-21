import React from "react";
import SeniorBadge from "./SeniorBadge";

const AllSeniors = ({AlumniDataProps}) => {

  return (
    <div className='flex flex-wrap'>
      {AlumniDataProps.map((data) => {
        return (
          <SeniorBadge
            key={data.id}
            // supabaseKey={data.key}
            image={data.imageUrl}
            name={data.name}
            passoutYear={data.passoutYear}
            designation={data.designation}
            all={data}
          />
        );
      })}
    </div>
  );
};

export default AllSeniors;
