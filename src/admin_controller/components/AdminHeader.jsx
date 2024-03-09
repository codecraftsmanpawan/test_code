import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { parseJwt } from "../../utils/common";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import { baseURL } from "../../hooks/config";
const AdminHeader = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("accessToken"));
  useEffect(() => {
    // Check if token is null or undefined
    if (token === undefined || token === null) {
      // Redirect to login page or handle the error accordingly
      window.location.href = '/adminlogin';
    }
  }, [token]);
  const data = parseJwt(token);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const nameFromEmailFunc = (data) => {
    let nameFromEmail = data.sub.split("@");
    nameFromEmail = nameFromEmail[0];
    return nameFromEmail;
  };

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("idToken");
      localStorage.removeItem("accessToken");
      navigate("/adminlogin");
    }, 2000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== retypeNewPassword) {
      setPasswordChangeError("New passwords do not match");
      return;
    }

    // Make API call to change password
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      currentPassword,
      newPassword,
      retypeNewPassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${baseURL}/user/changePassword`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // Handle success response
        console.log(result);
        setPasswordChangeSuccess("Password changed successfully");
        toast.success("Password changed successfully");
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        setPasswordChangeError("Failed to change password");
      })
      .finally(() => {
        // Reset form fields
        setCurrentPassword("");
        setNewPassword("");
        setRetypeNewPassword("");

        // Close the modal after submitting
        setShowPasswordChangeForm(false);
      });
  };

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

  // define the fetch request function
  const fetchData = async () => {
    // create the headers object
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // make the fetch request and handle the response or the error
    try {
      const response = await fetch(
        `${baseURL}/receiveNotification`,
        requestOptions
      );
      const result = await response.json();
      setResult(result);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    // Clean up the interval on unmount or on dependency change
    return () => clearInterval(interval);
  }, []);

  const deleteFunction = async items => {
    setResult(oldValues => {
      return oldValues.filter(item => item.id !== items.id);
    });

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer  ${token}`);

    const raw = "";

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `${baseURL}/deleteNotification/${items.id}`,
      requestOptions
    );
  };

  // Sort notifications in descending order based on creation date
  const sortedNotifications = result.sort((a, b) => {
    return new Date(b.createdDate) - new Date(a.createdDate);
  });

  return (
    <div>
      <div className="main-header">
        {/* Logo Header */}
        <div className="logo-header">
          <a href="#" className="logo navbar-brand">
             <img
              src="assets/images/logo.png"
              alt="navbar brand"
              className="navbar-brand desktop"
            />
           <h4 className="ml-5 mt-2" style={{ fontWeight:"700" }}>Admin</h4>

            <img
              src="assets/images/icon.png"
              alt="navbar brand"
              className="mobile"
            />
          </a>

          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="las la-bars" />
          </button>
          <button className="topbar-toggler more toggled">
            <img src="assets/images/icon-options-vertical.svg" alt="" />
          </button>
        </div>
        {/* End Logo Header */}
        {/* Navbar Header */}
        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="las la-bars" />
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
                      {result && result.length > 0 ? Number(result.length) : 0}
                    </span>
                  </span>
                </Link>

                <ul
                  className="dropdown-menu notif-box animated fadeIn"
                  aria-labelledby="notifDropdown"
                >
                  <li>
                    <div className="dropdown-title">
                      {`  You have ${
                        result && result.length > 0 ? Number(result.length) : 0
                      } new notification`}
                    </div>
                  </li>
                  <li>
                    <div
                      className="notif-scroll scrollbar-outer overflow-auto"
                      style={{maxHeight: "300px"}}
                    >
                      <div className="notif-center">
                        {sortedNotifications.map(notification => (
                          <div key={notification.id}>
                            <Link
                              
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
                        ))}
                      </div>
                    </div>
                  </li>
                  <li>
                    <a className="see-all" href="">
                      See all notifications<i className="la la-angle-right"></i>{" "}
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown hidden-caret top-user-profile">
                <a
                  className="dropdown-toggle profile-pic"
                  data-toggle="dropdown"
                  href="#"
                  aria-expanded="false"
                >
                  <p>
                    <small>Welcome</small> Admin
                  </p>
                  <div className="avatar-sm">
                    <img
                      src="assets/images/admin.png"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-user animated fadeIn">
                  <div className="dropdown-user-scroll scrollbar-outer">
                    <li>
                      <div className="user-box">
                        <div className="u-text">
                          <h4>{nameFromEmailFunc(data).toUpperCase()}</h4>
                          <p className="text-muted">{data.sub}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="dropdown-divider" />
                      <button className="dropdown-item" onClick={() => setShowPasswordChangeForm(true)}>
                        Password change
                      </button>

                      <div className="dropdown-divider" />
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        {/* End Navbar */}
      </div>
      <Modal show={showPasswordChangeForm} onHide={() => setShowPasswordChangeForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            {passwordChangeError && <div className="alert alert-danger">{passwordChangeError}</div>}
            {passwordChangeSuccess && <div className="alert alert-success">{passwordChangeSuccess}</div>}
            <Form.Group controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="retypeNewPassword">
              <Form.Label>Retype New Password</Form.Label>
              <Form.Control
                type="password"
                value={retypeNewPassword}
                onChange={(e) => setRetypeNewPassword(e.target.value)}
                required
              />
            </Form.Group><br />
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default AdminHeader;
