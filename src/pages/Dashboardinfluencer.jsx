import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Influencerheader from "../component/Influencerheader";
import InfluencerSidebar from "../component/InfluencerSidebar";
import GetInfluencers from "../GetDataFunctions/GetInfluencers";
import {getToken} from "../utils/common";
import { baseURL } from "../hooks/config";

const Dashboardinfluencer = () => {
  const [campaignData, setCampaignData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token")); // Retrieve token from localStorage
        if (!token) {
          // Handle if token is not found
          navigate("/login"); // Navigate to login page or handle as needed
          return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token.idToken}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${baseURL}/influencer`,
          requestOptions
        );
        const result = await response.json();

        if (result.status === "NOT_FOUND") {
          navigate("/influencercreate");
        } else {
          navigate("/dashboardinfluencer");
        }

        // Assuming you want to set campaign data regardless of the result
        setCampaignData(result.influencerInvites);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigate]);

  // Calculate campaign statistics
  const totalCampaigns = campaignData.length;

  const totalCampaignInvites = campaignData.filter(
    invite => invite.inviteStatus === "SENT"
  ).length;
  const totalCampaignAccepted = campaignData.filter(
    invite => invite.inviteStatus === "ACCEPTED"
  ).length;
  const totalPostSent = campaignData.filter(
    invite => invite.postStatus !== "EMPTY"
  ).length;
  const totalPostModifyRequested = campaignData.filter(
    invite => invite.postStatus === "REJECT"
  ).length;
  const totalPostAccepted = campaignData.filter(
    invite => invite.postStatus === "ACCEPTED"
  ).length;

  return (
    <>
      <div class="wrapper influencers_sect">
        <Influencerheader /> <InfluencerSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-inner mt30">
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile1">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Total Campaigns</p>
                          <h1>{totalCampaigns}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile2">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Total Campaign Invite</p>
                          <h1>{totalCampaignInvites}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile3">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Total Campaign Accepted</p>
                          <h1> {totalCampaignAccepted}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile1">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Total Post Sent</p>
                          <h1>{totalPostSent}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile2">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Total Post Modify Requested</p>
                          <h1>{totalPostModifyRequested}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile3">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Total Post Accepted</p>
                          <h1>{totalPostAccepted}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*      <div className="form-row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-head-row">
                          <h4 className="card-title">Call Status Wise</h4>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="chart-container">
                          <canvas id="totalIncomeChart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Analysis Call</h4>
                      </div>
                      <div className="card-body">
                        <div className="chart-container">
                          <canvas id="multipleLineChart1"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboardinfluencer;
