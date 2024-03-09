import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { baseURL } from "../../../hooks/config";

const Allincampaigns = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        const response = await fetch(`${baseURL}/admin/allInfluencer`, requestOptions);
        const result = await response.json();

        const newData = await Promise.all(
          result.map(async (influencer) => {
            const invitesWithDetails = await Promise.all(
              influencer.influencerInvites.map(async (invite) => {
                const campaignDetailsResponse = await fetch(`${baseURL}/campaign/restrict/${invite.campaignId}`, requestOptions);
                const campaignDetails = await campaignDetailsResponse.json();
                return { ...invite, campaignDetails };
              })
            );
            return { ...influencer, influencerInvites: invitesWithDetails };
          })
        );

        setData(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
let index = 1;
  return (
    <div className="wrapper influencers_sect">
      <AdminHeader />
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-header mt10">
            <h1 className="page-title">Our Campaigns</h1>
            <div className="expor-data ml-auto"></div>
          </div>
          <div className="page-inner">
            <div className="content-wrapper">
              <div className="dasboard-table content_FLX_mdl mt10">
                <div className="table-responsive">
                  <table
                    id="example3"
                    className="table table-striped table-bordered dt-responsive nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Sl.</th>
                        <th>Preview</th>
                        <th>Influencer Name</th>
                        <th>Campaigns Name</th>
                        <th>Brand Name</th>
                        <th>Genre</th>
                        <th>Social Media</th>
                        <th>Campaigns</th>
                        <th>Country</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Campaigns Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((influencer) =>
                        influencer.influencerInvites.map((invite) => (
                          <tr key={invite.id}>
                            <td>{index++}</td>
                            <td>
                              <img
                                src={
                                  invite.campaignDetails?.campaignPic.pathUri ||
                                  "assets/images/infl-product2.jpg"
                                }
                                style={{
                                  maxWidth: "60px",
                                  borderRadius: "10%",
                                  maxHeight: "50px",
                                }}
                                alt=""
                              />
                            </td>
                            <td>{influencer.influencerName}</td>
                            <td>
                              {invite.campaignDetails?.campaignName || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.brandName || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.genres.join(", ") || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.socialMedia || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.campaignTypes?.join(", ") || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.country || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.startDate || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.endDate || "Loading..."}
                            </td>
                            <td>
                              {invite?.postStatus === "SENT" ? (
                                <span className="text-warning">
                                  <i>Post Pending</i>
                                </span>
                              ) : invite?.postStatus === "REJECT" ? (
                                <span className="text-danger">
                                  <i>Modify post request</i>
                                </span>
                              ) : invite?.postStatus === "ACCEPTED" ? (
                                <span className="text-success">
                                  <i>Post Accepted</i>
                                </span>
                              ) : invite?.inviteStatus === "SENT" ? (
                                <span className="text-warning">
                                  <i>Campaign Invite</i>
                                </span>
                              ) : invite?.inviteStatus === "REJECT" ? (
                                <span className="text-danger">
                                  <i>Campaign Rejected</i>
                                </span>
                              ) : invite?.inviteStatus === "ACCEPTED" ? (
                                <span className="text-success">
                                  <i>Campaign Accepted</i>
                                </span>
                              ) : (
                                "Request" || "Loading..."
                              )}
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="copyright_text">
              © 2023, Sociopuff. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </div>
  );
};

export default Allincampaigns;
