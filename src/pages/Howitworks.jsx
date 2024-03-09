import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? '' : buttonName);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div className="main-header">
        <div className="logo-header">
          <Link to="/" className="logo">
            <img src="assets/images/logo.png" alt="navbar brand" className="navbar-brand desktop" />
            <img src="assets/images/icon.png" alt="navbar brand" className="mobile" />
          </Link>
          <button
            className="navbar-toggler sidenav-toggler ml-auto d-lg-none"
            type="button"
            onClick={toggleSidebar}
          >
            <i className={`las ${sidebarOpen ? 'la-bars' : 'la-times'}`}></i>
          </button>
          <button className="topbar-toggler more toggled">
            <img src="assets/images/icon-options-vertical.svg" alt="" />
          </button>
        </div>
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar" onClick={toggleSidebar}>
              <i className={`las ${sidebarOpen ? 'la-bars' : 'la-times'}`}></i>
            </button>
          </div>
        </nav>
      </div>

      <div className={`sidebar sidebar-style-2 ${sidebarOpen ? 'show' : 'hide'}`}>
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
      </div>
    </div>
  );
};

export default Sidebar;
