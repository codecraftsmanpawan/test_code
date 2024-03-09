import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {useAuth} from "../hooks/authProvider";
import {getUserInfoFromIDtoken, parseJwt} from "../utils/common";
import GetInfluencers from "../GetDataFunctions/GetInfluencers";
import { baseURL } from "../hooks/config";

const Influencerheader = () => {
  const {LogOutHandle} = useAuth();
  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    if (token === undefined || token === null || token === "") {
      window.location.href = '/login';
    }
  }, [token]);
  const nameFromEmailFunc = data => {
    let nameFromEmail = data.sub.split("@");
    nameFromEmail = nameFromEmail[0];
    return nameFromEmail;
  };
  const data = parseJwt(token.accessToken);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const influencerData = GetInfluencers(`${baseURL}/influencer`);
  const influencer = influencerData && influencerData.data;

  const calculateTimeDifference = createdDate => {
    const currentTime = new Date() / 1000;
    const difference = Math.floor(currentTime - createdDate);
    if (difference < 60) {
      return `${difference} microsecond${difference > 1 ? "s" : ""} ago`;
    } else if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (difference < 604800) {
      const days = Math.floor(difference / 86400);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (difference < 2629746) {
      const weeks = Math.floor(difference / 604800);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      const months = Math.floor(difference / 2629746);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    }
  };

  // Define the fetch request function
  const fetchData = async () => {
    try {
      const response = await fetch(
       ` ${baseURL}/receiveNotification`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
        }
      );
      const result = await response.json();
      setResult(
        result.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data at regular intervals
    }, 60000); // Refresh every 60 seconds (adjust as needed)

    // Clean up timer on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const deleteFunction = async items => {
    setResult(oldValues => {
      return oldValues.filter(item => item.id !== items.id);
    });

    try {
      await fetch(`${baseURL}/deleteNotification/${items.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.idToken}`,
        },
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="main-header">
        <div className="logo-header">
          <Link to="/" className="logo">
            <img
              src="assets/images/logo.png"
              alt="navbar brand"
              className="navbar-brand desktop"
            />
            <img
              src="assets/images/icon.png"
              alt="navbar brand"
              className="mobile"
            />
          </Link>
          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="las la-bars"></i>
          </button>
          <button className="topbar-toggler more toggled">
            <img src="assets/images/icon-options-vertical.svg" alt="" />
          </button>
        </div>

        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="las la-bars"></i>
            </button>
          </div>
          <div className="container-fluid">
            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li className="nav-item dropdown hidden-caret">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="notifDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span
                    className="bell-sect mt-2"
                    style={{position: "relative", display: "inline-block"}}
                  >
                    <img
                      src="assets/images/notifications.svg"
                      alt="notification"
                    />
                    <span
                      className="badge badge-pill badge-danger"
                      style={{
                        position: "absolute",
                        top: "-6px",
                        right: "-10px",
                      }}
                    >
                      {result && result.length > 0 ? result.length : 0}
                    </span>
                  </span>
                </Link>

                <ul
                  className="dropdown-menu notif-box animated fadeIn"
                  aria-labelledby="notifDropdown"
                >
                  <li>
                    <div className="dropdown-title">
                      {`You have ${
                        result && result.length > 0 ? result.length : 0
                      } new notification`}
                    </div>
                  </li>
                  <li>
                    <div
                      className="notif-scroll scrollbar-outer overflow-auto"
                      style={{maxHeight: "300px"}}
                    >
                      <div className="notif-center">
                        {result ? (
                          result.map(notification => (
                            <div key={notification.id}>
                              <Link
                                to="/Influencernotifications"
                                onClick={() => deleteFunction(notification)}
                              >
                                <div className="notif-content">
                                  <span className="block">
                                    {" "}
                                    {notification.textMessage}
                                  </span>
                                  <span className="time">
                                    {calculateTimeDifference(
                                      new Date(notification.createdDate)
                                    )}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted">No new notifications</div>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link className="see-all" to="/influencermanagecampaigns">
                      See all notifications{" "}
                      <i className="la la-angle-right"></i>{" "}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown hidden-caret top-user-profile">
                <Link
                  className="dropdown-toggle profile-pic"
                  data-toggle="dropdown"
                  href="#"
                  aria-expanded="false"
                >
                  <p>
                    WELCOME{" "}
                    {influencer?.influencerName.toUpperCase() ||
                      nameFromEmailFunc(data).toUpperCase()}
                  </p>
                  <div className="avatar-sm">
                    <img
                      src={
                        influencer?.influencerPic.pathUri ||
                        "assets/images/user-brand.png"
                      }
                      alt="Profile"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </Link>
                <ul className="dropdown-menu dropdown-user animated fadeIn">
                  <div className="dropdown-user-scroll scrollbar-outer">
                    <li>
                      <div className="user-box">
                        <div className="u-text">
                          <h4>
                            {influencer?.influencerName ||
                              nameFromEmailFunc(data).toUpperCase()}
                          </h4>
                          <p className="text-muted">
                            {influencer?.email || data.sub}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="/">
                        My Profile
                      </a>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={LogOutHandle}>
                        Logout
                      </button>
                    </li>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Influencerheader;
