import React, { useState, useEffect } from 'react';
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { parseJwt } from '../../../utils/common';
import { baseURL } from '../../../hooks/config';

const AdminDashboard = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [campaignsData, setCampaignsData] = useState();
  const [data, setData] = useState({
    totalInfluencers: 0,
    totalCampaigns: 0,
    totalCampaignInvites: 0,
    totalCampaignAccepted: 0,
    totalPendingCampaign: 0,
    totalRejectCampaign: 0,
    totalPostSent: 0,
    totalPostModifyRequested: 0,
    totalPostAccepted: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Total Influencers data
        const influencerResponse = await fetch(`${baseURL}/admin/influencers`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        const influencerData = await influencerResponse.json();

        // Fetch Campaigns data
        const campaignsResponse = await fetch(`${baseURL}/campaigns`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        });
        const campaignsData = await campaignsResponse.json();
        setCampaignsData(campaignsData);

        // Calculate totalCampaignSentInvites here
        const totalCampaignInvites = campaignsData.reduce((total, campaign) => {
          return total + campaign.campaignInvites.length;
        }, 0);

        // Set data to state
        setData({
          totalInfluencers: influencerData.length,
          totalCampaigns: campaignsData.length,
          totalCampaignInvites,
          totalCampaignAccepted: 0, // Set your actual count here
          totalPendingCampaign: 0, // Set your actual count here
          totalRejectCampaign: 0, // Set your actual count here
          totalPostSent: 0, // Set your actual count here
          totalPostModifyRequested: 0, // Set your actual count here
          totalPostAccepted: 0 // Set your actual count here
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="wrapper">
      <AdminHeader />
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner mt30">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile1">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Influencers</p>
                        <h1>{data.totalInfluencers}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile2">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Campaign</p>
                        <h1>{data.totalCampaigns}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile3">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Campaign Invite</p>
                        <h1>{data.totalCampaignInvites}</h1>
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
                        <p>Total Campaign Accepted</p>
                        <h1>{data.totalCampaignAccepted}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile2">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Pending Campaign</p>
                        <h1>{data.totalPendingCampaign}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile3">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Reject Campaign</p>
                        <h1>{data.totalRejectCampaign}</h1>
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
                        <h1>{data.totalPostSent}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile2">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Post Modify Requested</p>
                        <h1>{data.totalPostModifyRequested}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 tiles">
                  <div className="tiles-main bg-tile3">
                    <div className="bubble-shadow">
                      <div className="text_pnl">
                        <p>Total Post Accepted</p>
                        <h1>{data.totalPostAccepted}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
