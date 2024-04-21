import React from "react";
import AlumniCard from "./AlumniCard";

const AlumniCluster = ({ AlumniDataProps }) => {
  return (
    <div className="flex flex-wrap">
      {AlumniDataProps.map((data) => {
        return (
          <AlumniCard
            key={data.id}
            {...data}
          />
        );
      })}
    </div>
  );
};

export default AlumniCluster;
