import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";

const UpdateCampaign = () => {
  // Extract the id parameter from the URL
  const {id} = useParams();

  useEffect(() => {
    const updateCampaignData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InF3ZXJ0eUBnbWFpbC5jb20iLCJtb2JpbGUiOiIyMTQ0NDc5OTkwIiwicHJvdmlkZXIiOiJMT0NBTCIsInVzZXJJZCI6MTksInN1YiI6InF3ZXJ0eUBnbWFpbC5jb20iLCJpYXQiOjE3MDU1MDQzMDIsImV4cCI6MTcwNTUyMjMwMn0.uL0YJwv2NtqIGktqNXuo-thCMNk7BEhgsUtgMiX7aGI"
        );

        const raw = JSON.stringify({
          campaignName: "Pawan Campaign",
          brandName: "Sample Brand",
          // ... (Add other properties based on your data)
        });

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        // Replace "http://localhost:9090/campaign/$id" with the actual API endpoint
        const response = await fetch(
          `http://localhost:9090/campaign/${id}`,
          requestOptions
        );
        const result = await response.text();

        console.log(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the updateCampaignData function when the component mounts
    updateCampaignData();
  }, [id]); // Include id in the dependency array to update when the id changes

  return (
    <div>
      {/* Your component JSX content */}
      <h1>Updating Campaign Data for ID: {id}</h1>
      <Link to={`/Influencers/${id}`}>
        <img src="assets/images/invite.svg" className="w-18" alt="Invite" />
      </Link>
      {/* Add any other UI elements or components as needed */}
    </div>
  );
};

export default UpdateCampaign;
