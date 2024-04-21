import React, { useEffect, useState } from "react";
import SpotLightCard from "./SpotLightCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CarouselCard = ( {AlumniDataProps}) => {
  
  return (
    <div className="carousel carousel-center max-w-full pt-8 space-x-4">
      {AlumniDataProps.map((data) => {
        return (
          <SpotLightCard
            key={data.id}
            image={data.imageUrl}
            name={data.name}
            passoutYear={data.passoutYear}
            designation={data.designation}
            department={data.department}
            all={data}
          />
        );
      })}
    </div>
  );
};

export default CarouselCard;
