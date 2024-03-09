import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Influencerheader from "../component/Influencerheader";
import { baseURL } from "../hooks/config";

const Influencernotifications = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [influencerData, setInfluencerData] = useState(null);
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token.idToken]);
  useEffect(() => {
    const fetchData = async () => {
      if (!influencerData || !influencerData.influencerInvites) return;
      try {
        const inviteIds = influencerData.influencerInvites.map(
          invite => invite.campaignId
        );
        const uniqueInviteIds = Array.from(new Set(inviteIds));
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
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [influencerData, token.idToken]);

  const handleAction = async (inviteId, campaignId, userId, action) => {
    try {
      const response = await fetch(
        `${baseURL}/invite/action/${campaignId}/${inviteId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
          redirect: "follow",
        }
      );

      const result = await response.text();
      console.log(result);

      if (response.ok) {
        toast.success(
          `Invite ${action === "true" ? "accepted" : "rejected"} successfully`
        );

        const notificationHeaders = new Headers();
        notificationHeaders.append("Content-Type", "application/json");
        notificationHeaders.append("Authorization", `Bearer ${token.idToken}`);

        const influencerName = influencerData.influencerName;
        const campaignName = campaignData[campaignId].campaignName;

        const notificationBody = {
          textMessage: `${influencerName} ${
            action === "true" ? "Approved" : "Rejected"
          } your request for the campaign "${campaignName}"`,
          status: "FAILED",
          receiverId: userId,
        };

        const notificationRequestOptions = {
          method: "POST",
          headers: notificationHeaders,
          body: JSON.stringify(notificationBody),
          redirect: "follow",
        };

        fetch(
          `${baseURL}/sendNotification`,
          notificationRequestOptions
        )
          .then(response => response.text())
          .then(result => {
            console.log(result);

            window.location.reload();
          })
          .catch(error => console.log("error", error));
      } else {
        toast.error("Error performing the action");
      }
    } catch (error) {
      console.error(`Error ${action} invite with ID ${inviteId}:`, error);
      toast.error(
        `Error ${action === "true" ? "accepting" : "rejecting"} invite`
      );
    }
  };

  const handleAccept = (inviteId, campaignId, userId, event) => {
    event.preventDefault();
    handleAction(inviteId, campaignId, userId, "true");
  };

  const handleReject = (inviteId, campaignId, userId, event) => {
    event.preventDefault();
    handleAction(inviteId, campaignId, userId, "false");
  };

  return (
    <div>
      <div className="wrapper influencers_sect">
        <Influencerheader />
        <div className="sidebar sidebar-style-2">
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-primary">
                <li className="nav-item bdr_top1">
                  <Link to="/dashboardinfluencer">
                    <img
                      src="assets/images/dashboard.svg"
                      className="nav-icn"
                      alt=""
                    />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/Influencerreportanalytics">
                    <img
                      src="assets/images/report-analytics.svg"
                      className="nav-icn"
                      alt=""
                    />
                    <p>Reports &#38; Analytics </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/influencerdiscovercampaigns">
                    <img
                      src="assets/images/your-campaigns.svg"
                      className="nav-icn"
                      alt=""
                    />
                    <p>Discover Campaigns</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/influencermanagecampaigns">
                    <img
                      src="assets/images/manage-campaigns.svg"
                      className="nav-icn"
                      alt=""
                    />
                    <p>Manage Campaigns</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/influencerinfluencers">
                    <img
                      src="assets/images/influencers.svg"
                      className="nav-icn"
                      alt=""
                    />
                    <p>Influencers</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt20">
              <Link className="btn-sm btn-light mr-2" href="">
                <i className="fa fa-arrow-left-long" /> Back
              </Link>
              <h1 className="page-title">Your Notifications</h1>
            </div>
            <div className="page-inner infl-detail">
              <div className="content-wrapper">
                <div className="card form-group">
                  <div className="card-body">
                    {influencerData &&
                      influencerData.influencerInvites
                        .filter(
                          invite =>
                            invite.inviteStatus === "SENT" &&
                            invite.postStatus === "EMPTY"
                        )
                        .map((invite, index) => (
                          <div className="form-group" key={invite.id}>
                            <h2 className="card-title font-weight-bold mb-3">
                              {index + 1}.{" "}
                              {campaignData &&
                              campaignData[invite.campaignId] ? (
                                <span>
                                  {campaignData[invite.campaignId].socialMedia}{" "}
                                  campaign request
                                </span>
                              ) : (
                                <span>Loading...</span>
                              )}
                            </h2>
                            <h2 className="card-title font-weight-bold mb-2">
                              Campaign Details
                            </h2>
                            <ul className="feedback">
                              {campaignData &&
                              campaignData[invite.campaignId] ? (
                                <div>
                                  <li>
                                    <strong>Campaign Name : </strong>
                                    {
                                      campaignData[invite.campaignId]
                                        .campaignName
                                    }
                                  </li>
                                  <li>
                                    <strong> Brand Name : </strong>
                                    {campaignData[invite.campaignId].brandName}
                                  </li>
                                  <li>
                                    <strong> Brand Details : </strong>
                                    {
                                      campaignData[invite.campaignId]
                                        .brandDetails
                                    }
                                  </li>
                                </div>
                              ) : (
                                <p>Loading...</p>
                              )}
                            </ul>

                            <div className="mt-3 pb-3">
                              <button
                                className="btn inflcrbtn mr-2"
                                onClick={e =>
                                  handleAccept(
                                    invite.id,
                                    invite.campaignId,
                                    campaignData[invite.campaignId].userId,
                                    e
                                  )
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={e =>
                                  handleReject(
                                    invite.id,
                                    invite.campaignId,
                                    campaignData[invite.campaignId].userId,
                                    e
                                  )
                                }
                              >
                                Reject
                              </button>
                            </div>
                            <hr />
                          </div>
                        ))}

                    {!influencerData ||
                      (!influencerData.influencerInvites.some(
                        invite =>
                          invite.inviteStatus === "SENT" &&
                          invite.postStatus === "EMPTY"
                      ) &&
                        navigate("/influencermanagecampaigns"))}
                  </div>
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Influencernotifications;
