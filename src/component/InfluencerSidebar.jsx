import React from "react";
import {NavLink} from "react-router-dom";

const InfluencerSidebar = () => {
  return (
    <div>
      <div className="sidebar sidebar-style-2">
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-primary">
              <li className="nav-item bdr_top1">
                <NavLink
                  to="/dashboardinfluencer"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "red" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/dashboard.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Dashboard</p>
                </NavLink>
              </li>

              <li className="nav-item ">
                <NavLink
                  to="/influencerdiscovercampaigns"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "red" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/your-campaigns.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Discover Campaigns</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/influencermanagecampaigns"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "red" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/manage-campaigns.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Manage Campaigns</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/influencerinfluencers"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "red" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/influencers.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Influencers</p>
                </NavLink>
              </li>
              {/*  <li className="nav-item">
                                <NavLink to="/influencercampaignrequests"
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "#fff" : "",
                                            background: isActive ? "red" : "",
                                            borderRadius: isActive ? "5px" : "",
                                        };
                                    }}
                                >
                                    <img
                                        src="assets/images/influencers.svg"
                                        className="nav-icn"
                                        alt=""
                                    />
                                    <p>Campaign Requests</p>
                                </NavLink>
                            </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSidebar;
