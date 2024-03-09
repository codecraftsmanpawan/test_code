import React from "react";
import {NavLink} from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div>
      <div className="sidebar sidebar-style-2">
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-primary  mt-5">
              <li className="nav-item bdr_top1 ">
                <NavLink
                  to="/admindashboard"
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
              <li className="nav-item bdr_top1 ">
                <NavLink
                  to="/admincampaignsStatus"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
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
                  <p>Campaigns Status</p>
                </NavLink>
              </li>
              <li className="nav-item bdr_top1  ">
                <NavLink
                  to="/createinfluenceradmin"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/influencers.svg"
                    className="nav-icn "
                    alt="influencers"
                  />
                  <p>Create Influencer</p>
                </NavLink>
              </li>
              <li className="nav-item bdr_top1  ">
                <NavLink
                  to="/allinfluenceradmin"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/influencers.svg"
                    className="nav-icn "
                    alt="influencers"
                  />
                  <p>Added Influencers</p>
                </NavLink>
              </li>
              <li className="nav-item bdr_top1  ">
                <NavLink
                  to="/createcampaignadmin"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
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
                  <p>Create Campaign</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/allcampaignadmin"
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
                  <p>Added Campaigns</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/adminmanagecampaigns"
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
                  <p>Manages Campaigns </p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admininvite"
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
                  <p>Invited Influencers</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/adminwishlist"
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
                  <p>Wishlist</p>
                </NavLink>
              </li>
              <li className="nav-item bdr_top1  ">
                <NavLink
                  to="/allinfluencer"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/influencers.svg"
                    className="nav-icn "
                    alt="influencers"
                  />
                  <p >All Influencers</p>
                </NavLink>
              </li>
              <li className="nav-item bdr_top1  ">
                <NavLink
                  to="/allincampaigns"
                  style={({isActive}) => {
                    return {
                      color: isActive ? "white" : "",
                      background: isActive ? "#2E69B3" : "",
                      borderRadius: isActive ? "5px" : "",
                    };
                  }}
                >
                  <img
                    src="assets/images/influencers.svg"
                    className="nav-icn "
                    alt="influencers"
                  />
                  <p >All Campaigns</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AdminSidebar;
