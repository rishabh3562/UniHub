import React from "react";
import DiscussionCard from "./DiscussionCard";

const DiscussionCluster = ({ discussionDataProps }) => {
  return (
    <>
      {discussionDataProps.map((discussionData) => {
        return <DiscussionCard {...discussionData} />;
      })}
    </>
  );
};

export default DiscussionCluster;
