import {NavLink} from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar sidebar-style-2">
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-primary">
              <li className="nav-item bdr_top1 ">
                <NavLink
                  to="/dashboardbrand"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
                      background: isActive ? "#2E69B3" : "",
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
              <li className="nav-item">
                <NavLink
                  to="/yourcampaigns"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/your-campaigns.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Your Campaigns</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/campaignsstatus"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#ffff" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/campaigns-status.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Campaigns Status</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/influencers"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#2E69B3" : "",
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
              <li className="nav-item">
                <NavLink
                  to="/howitworks"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/how-it-works.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>How It Works?</p>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink
                  to="/reportanalytics"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/report-analytics.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Reports &#38; Analytics </p>
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/wishlist.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>Wishlist</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/allinvities"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "#fff" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/all-invities.svg"
                    className="nav-icn"
                    alt=""
                  />
                  <p>All Invities</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Sidebar;
