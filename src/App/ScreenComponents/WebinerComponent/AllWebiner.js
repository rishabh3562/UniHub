import React, { useState, useEffect } from "react";
import FilterEvents from "./Components/FilterEvents";
import EventList from "./Components/EventList";
import "../../../AppStyles/webinars.css";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../Config/Firebase/firebase-config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AllWebiner = () => {
  const [webinarData, setWebinarData] = useState([]);
  const [activeFilter, setActiveFilter] = useState(1);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchWebinarData = async () => {
      const webinarCollection = collection(db, "webinar");
      const webinarQuery = query(webinarCollection);

      if (filter === "upcoming") {
        const today = new Date().toISOString().split("T")[0];
        const upcomingWebinarQuery = query(
          webinarCollection,
          where("date", ">=", today),
          orderBy("date", "desc")
        );
        const webinarSnapshot = await getDocs(upcomingWebinarQuery);
        const webinarData = webinarSnapshot.docs.map((doc) => doc.data());
        setWebinarData(webinarData);
      } else if (filter === "previous") {
        const today = new Date().toISOString().split("T")[0];
        const previousWebinarQuery = query(
          webinarCollection,
          where("date", "<", today),
          orderBy("date", "desc")
        );
        const webinarSnapshot = await getDocs(previousWebinarQuery);
        const webinarData = webinarSnapshot.docs.map((doc) => doc.data());
        setWebinarData(webinarData);
      } else {
        const webinarSnapshot = await getDocs(webinarQuery);
        const webinarData = webinarSnapshot.docs.map((doc) => doc.data());
        setWebinarData(webinarData);
      }
    };

    fetchWebinarData();
  }, [filter]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  const headerSkeleton = (
    <>
      <div className="col-span-1">
        <Skeleton style={{ width: "50%", height: "100%" }}  />
        <Skeleton style={{ width: "30%", height: "45%" }} />
      </div>
    </>
  );

  return (
    <>
      <div className="grid grid-cols-1 px-6 pb-8 pt-24">
      {webinarData.length === 0 ? (
          headerSkeleton
        ) : (
        <div className="col-span-1">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            Mentorship <span className="f-color-3">Program</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            All the webinars are scheduled as per students' request for
            mentorship
          </p>
        </div>
        )}
        <div className="col-span-1">
          {webinarData.length > 0 ? (
            <FilterEvents setFilter={setFilter} activeFilter={activeFilter} />
          ) : (
            <div className="w-[100%] flex justify-center align-middle gap-6 md:gap-10 pt-16">
              <Skeleton height={60} width={60} circle={true} />
              <Skeleton height={60} width={60} circle={true} />
              <Skeleton height={60} width={60} circle={true} />
            </div>
          )}
        </div>
      </div>
      <div className="mb-20">
        <div className="col-span-1 space-y-8">
          {webinarData.length > 0
            ? webinarData.map((data) => {
                return <EventList key={data.id} {...data} />;
              })
            : Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 mt-0 md:mt-12 py-16 md:py-5 px-6"
                  >
                    <div className="col-span-3 md:col-span-1">
                      <Skeleton className="h-[20rem] md:h-[30rem] w-[100%]" />
                    </div>
                    <div className="col-span-3 md:col-span-2 md:pl-5 md:pr-1 lg:pr-3 flex flex-col justify-between">
                      <Skeleton height={30} count={3} />
                      <Skeleton height={30} className="mt-3" />
                      {/* <Skeleton height={30} width={100} /> */}
                    </div>
                  </div>
                ))}
        </div>
      </div>
    </>
  );
};

export default AllWebiner;
