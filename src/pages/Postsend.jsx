import React, {useEffect, useState} from "react";
import InfluencerHeader from "../component/Influencerheader";
import InfluencerSidebar from "../component/InfluencerSidebar";
import {toast} from "react-toastify";
import { baseURL } from "../hooks/config";

const Postsend = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [influencerData, setInfluencerData] = useState(null);
  const [influencerName, setInfluencerName] = useState("");
  const [campaignData, setCampaignData] = useState({});
  const [linksToSend, setLinksToSend] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/influencer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
          redirect: "follow",
        });

        const result = await response.json();
        setInfluencerData(result);

        if (result && result.name) {
          setInfluencerName(result.name);
        }
      } catch (error) {
        console.error("Error fetching influencer data:", error);
      }
    };

    fetchData();
  }, [token.idToken]);

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!influencerData || !influencerData.influencerInvites) return;

      try {
        const uniqueInviteIds = [
          ...new Set(
            influencerData.influencerInvites.map(invite => invite.campaignId)
          ),
        ];

        for (const id of uniqueInviteIds) {
          const response = await fetch(
            `${baseURL}/campaign/restrict/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token.idToken}`,
              },
            }
          );

          const result = await response.json();
          setCampaignData(prevData => ({
            ...prevData,
            [id]: result,
          }));
        }
      } catch (error) {
        console.error("Error fetching campaign data:", error);
      }
    };

    fetchCampaignData();
  }, [influencerData, token.idToken]);

  const postInviteLink = async (campaignId, inviteId, url) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token.idToken}`);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseURL}/invite/post/${campaignId}/${inviteId}/${url}`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      toast.success("Link sent successfully");

      postNotification(
        campaignId,
        influencerName,
        campaignData[campaignId]?.campaignName
      );
    } catch (error) {
      console.error("Error posting invite link:", error);
      toast.error("Error sending link"); // Display error toast
    }
  };

  const postNotification = async (campaignId, influencerName, campaignName) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token.idToken}`);

      const raw = JSON.stringify({
        textMessage: `Hi, ${influencerData.influencerName}, sending post for ${campaignName}`,
        status: "FAILED",
        receiverId: campaignData[campaignId]?.userId,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseURL}/sendNotification`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      window.location.reload();
    } catch (error) {
      console.error("Error posting notification:", error);
    }
  };

  const handleLinkChange = (inviteId, value) => {
    setLinksToSend(prevLinks => ({
      ...prevLinks,
      [inviteId]: value,
    }));
  };

  return (
    <>
      <div className="wrapper influencers_sect">
        <InfluencerHeader />
        <InfluencerSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10 mb-2">
              <h1 className="page-title">Manage Campaigns</h1>
            </div>
            <div className="page-inner">
              <div className="content-wrapper">
                <div className="card form-group">
                  <div className="card-body">
                    {influencerData &&
                    influencerData.influencerInvites &&
                    influencerData.influencerInvites.length > 0 ? (
                      influencerData.influencerInvites
                        .filter(
                          invite =>
                            (invite.inviteStatus === "ACCEPTED" &&
                              invite.postStatus === "EMPTY") ||
                            invite.postStatus === "REJECT"
                        )
                        .map((invite, index) => (
                          <div className="form-group" key={invite.id}>
                            <ul className="feedback">
                              <div>
                                <div className="card-body">
                                  <h2 className="card-title font-weight-bold mb-3">
                                    {index + 1}.{" "}
                                    {campaignData[invite.campaignId] ? (
                                      <span>
                                        Please upload your{" "}
                                        {
                                          campaignData[invite.campaignId]
                                            .socialMedia
                                        }{" "}
                                        campaign
                                      </span>
                                    ) : (
                                      <span>Loading...</span>
                                    )}
                                  </h2>
                                  <h2 className="card-title font-weight-bold mb-2">
                                    Campaign Details
                                  </h2>
                                  {/*     <li>
                                    {campaignData[invite.campaignId]?.userId ||
                                      "Loading..."}
                                  </li>
                                  <li>
                                    <strong>Invite ID: </strong>
                                    {invite.id}
                                  </li>
                                  <li>
                                    <strong>Campaign ID: </strong>
                                    {invite.campaignId}
                                  </li>
                                  <li>
                                    <strong>Invite Status: </strong>
                                    {invite.inviteStatus}
                                  </li>
                                  <li>
                                    <strong>Post Status: </strong>
                                    {invite.postStatus}
                                  </li>
                                  <li>
                                    <strong>Link: </strong>
                                    {invite.link || "N/A"}
                                  </li> */}
                                  <li>
                                    <strong>Campaign Name: </strong>
                                    {campaignData[invite.campaignId]
                                      ?.campaignName || "Loading..."}
                                  </li>
                                  <li>
                                    <strong>Brand Name: </strong>
                                    {campaignData[invite.campaignId]
                                      ?.brandName || "Loading..."}
                                  </li>
                                  <li>
                                    <strong>Brand Details: </strong>
                                    {campaignData[invite.campaignId]
                                      ?.brandDetails || "Loading..."}
                                  </li>
                                  <div className="user-form mt-3">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Paste an image or video URL"
                                        value={linksToSend[invite.id] || ""}
                                        onChange={e =>
                                          handleLinkChange(
                                            invite.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <button
                                    className="inflcrbtn btn"
                                    onClick={e => {
                                      e.preventDefault();
                                      postInviteLink(
                                        invite.campaignId,
                                        invite.id,
                                        linksToSend[invite.id] || ""
                                      );
                                    }}
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </ul>
                            <hr />
                          </div>
                        ))
                    ) : (
                      <div>No Invite Yet</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Postsend;
