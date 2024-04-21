import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import JobCard from "./components/JobCard";
import JobAdd from "./components/JobAdd";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../Config/Firebase/firebase-config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Career = () => {
  const [jobDomain, setJobDomain] = useState("All Domains");
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      const jobCollection = collection(db, "jobs");
      const jobDocs = await getDocs(
        query(jobCollection, orderBy("postedOn", "desc"))
      );
      const jobData = jobDocs.docs.map((doc) => doc.data());
      setJobData(jobData);
    };
    fetchJobData();
  }, []);

  const handleJobDomainChange = (event) => {
    setJobDomain(event.target.textContent);
    setSelectedUser(null);
  };

  const handleDashboardClick = (user) => {
    setSelectedUser(user);
    setJobDomain("All Domains");
  };

const filteredJobData = jobData
    ? jobDomain !== "All Domains"
      ? jobData.filter((data) => data.jobDomain === jobDomain)
      : jobData
    : [];

  const filteredByUserJobData = selectedUser
    ? filteredJobData.filter((data) => data.postedBy === selectedUser)
    : filteredJobData;

  const uniqueJobDomains = new Set(
    jobData?.map((data) => data.jobDomain) || []
  );

  const filteredJobCards = jobData
    ? filteredByUserJobData
        .filter((data) =>
          data.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((data) => <JobCard key={data.id} {...data} />)
    : [];

  return (
    <>
      <div className="grid grid-cols-3 px-5 md:px-10 pt-32">
        <div className="col-span-3 mb-10">
          {filteredByUserJobData.length === 0 ? (
            <>
              <Skeleton style={{ width: "50%", height: "60%" }} />
              <Skeleton style={{ width: "30%", height: "45%" }} />
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-6 f-color-1">
                Bring & Earn <span className="f-color-3">Referral</span>
              </h1>
              <p className="text-sm md:text-lg font-1 f-color-1">
                Let's create oppurtunities for juniors and other batchmates
              </p>
            </>
          )}
        </div>
        <div className="col-span-3 lg:col-span-1">
          {filteredByUserJobData.length === 0 ? (
            <Skeleton
              className="h-[4rem] mb-3 w-[100%] md:w-[20%] mt-3"
              style={{ borderRadius: "40px" }}
            />
          ) : (
            <div className="flex">
              <div className="absolute p-3 bg-color-3 rounded-full mt-2 md:mt-0 md:ml-[-10px]">
                <CiSearch className="text-4xl md:text-3xl" />
              </div>
              <input
                type="text"
                className="px-16 py-4 md:py-3.5 mt-2 md:mt-0 border-dashed border-2 rounded-full bg-color-4"
                placeholder="Search jobs from feed"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 pt-12 lg:pt-0 lg:col-span-1 flex justify-center lg:justify-end align-middle">
          {filteredByUserJobData.length === 0 ? (
            <div className="w-[100%] flex justify-center md:justify-end align-middle gap-6 md:gap-10">
              <Skeleton height={60} width={60} circle={true} />
              <Skeleton height={60} width={60} circle={true} />
            </div>
          ) : (
            <div className="btns font-6 flex flex-wrap gap-6 md:gap-10 justify-center align-middle">
              <JobAdd />
              <div className="cat-hov">
                <button className="rounded-full bg-color-3 flex text-center p-5 mx-2 dropdown dropdown-end">
                  <FiFilter tabIndex={0} size={20} />
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-color-2 rounded-box w-52 mt-10"
                  >
                    <li>
                      <a onClick={handleJobDomainChange}>All Domains</a>
                    </li>
                    {Array.from(uniqueJobDomains).map((jobDomain) => (
                      <li key={jobDomain}>
                        <a onClick={handleJobDomainChange}>{jobDomain}</a>
                      </li>
                    ))}
                  </ul>
                </button>
                <p className="pt-6 text-center font-2 f-color-2 text-sm md:text-md">
                  Filter Domain
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3 pt-10">
          {jobData ? (
            filteredJobCards.length > 0 ? (
              filteredJobCards 
            ) : (
              <p className="text-center font-2 f-color-2">
                No jobs match your search.
              </p>
            )
          ) : (
            <Skeleton
              className="h-[40rem] md:h-[30rem] mb-3"
              style={{ width: "100%" }}
              count={4}
            />
          )
          }
        </div>
      </div>
    </>
  );
};

export default Career;
