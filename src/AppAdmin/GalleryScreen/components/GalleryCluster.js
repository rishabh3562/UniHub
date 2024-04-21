import React from "react";
import GalleryCard from "./GalleryCard";


const GalleryCluster = ({ PhotoDataProps }) => {

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 py-16 mx-2 gap-14">
        {PhotoDataProps.map((data) => {
          return (
            <GalleryCard
              key={data.id}
              {...data}
            />
          );
        })}
      </div>
    </>
  );
};

export default GalleryCluster;
