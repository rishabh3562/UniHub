// ------------------------------------------------------
// Prerequisites
// ------------------------------------------------------
import React, { useState, useEffect } from "react";
// ------------------------------------------------------
// Styles
// ------------------------------------------------------
import "../../AppStyles/global.css";
import "../../AppStyles/colors.css";
import "../../AppStyles/HeroPage.css";
// ------------------------------------------------------
// Components
// ------------------------------------------------------
import HeroLogo from "../assets/UniHub.png";
import WebHeader from "./HeroComponents/WebHeader";
import UserTypeButton from "./HeroComponents/UserTypeButton";
import { useUserContext } from "../Config/Context/UserProvider";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroPage = () => {
  // eslint-disable-next-line
  const { user } = useUserContext();
// eslint-disable-next-line
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay of 2 seconds before showing the Skeleton loader
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clear the timeout when the component unmounts
    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 px-6 pt-5">
        <div className="col-span-1">
          <WebHeader />
        </div>
        <div className="col-span-1 flex justify-center align-middle pt-40 md:pt-16">
          <div className="flex flex-col">
            <figure className="flex justify-center align-middle">

              <img src={HeroLogo} alt="Hero Logo" />

            </figure>
            <p className="f-color-2  text-faded_blue font-1 md:text-xl text-center md:mt-20 ">
              crossover of generations - get mentorship, expand network and
              build your career
            </p>
            <div className="flex justify-center align-middle flex-wrap gap-5 md:gap-16 pt-8">
              {loading ? (
                <>
                  <Skeleton width={300} height={80} className="mb-2" style={{ borderRadius: "40px" }} />
                  <Skeleton width={300} height={80} className="mb-2" style={{ borderRadius: "40px" }} />
                </>
              ) : (
                <UserTypeButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPage;
