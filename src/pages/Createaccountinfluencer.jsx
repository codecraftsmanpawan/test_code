import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";
import React, {useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../hooks/config";

const Createaccountinfluencer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    roles: ["ROLE_INFLUENCER"],
    provider: "LOCAL",
  });

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const validatePassword = password => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!uppercaseRegex.test(password)) {
      toast.error("Password must contain 1 or more uppercase characters.");
      return false;
    }

    if (!specialCharRegex.test(password)) {
      toast.error("Password must contain 1 or more special characters.");
      return false;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const validateEmail = email => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!isValid) {
      toast.error("Invalid email address.");
    }

    return isValid;
  };

  const validateMobileNumber = mobileNumber => {
    // Basic mobile number validation
    const mobileNumberRegex = /^\d{10}$/;
    const isValid = mobileNumberRegex.test(mobileNumber);

    if (!isValid) {
      toast.error("Invalid mobile number.");
    }

    return isValid;
  };

  const submitForm = () => {
    const isEmailValid = validateEmail(formData.email);
    const isMobileNumberValid = validateMobileNumber(formData.mobileNumber);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid || !isMobileNumberValid || !isPasswordValid) {
      return;
    }

    // Make API request
    fetch(`${baseURL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Registration successful!");

        setFormData({
          email: "",
          mobileNumber: "",
          password: "",
          roles: [""],
          provider: "",
        });

        navigate("/login");
      })
      .catch(error => {
        console.error("Error:", error);
        toast.error("Registration failed. Please try again.");
      });
  };

  // Google Login

  return (
    <div>
      <section className="login-wrapper">
        <div className="login-form">
          <div className="container">
            <Link className="theme-logo" to="/">
              <img
                src="assets/images/logo.png"
                alt="Project & Resource Tracking System Logo"
              />
            </Link>
            <div className="form_sect signup">
              <div className="tab-content tab_sect">
                <div
                  className="tab-pane  active"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="data-tabs">
                    <ul className="nav mb-6" role="tablist">
                      <li className="nav-item brand">
                        <Link
                          className="nav-link"
                          data-toggle="pill"
                          to="/createaccount"
                        >
                          Brand
                        </Link>
                      </li>
                      <li className="nav-item influencer active">
                        <Link
                          className="nav-link"
                          data-toggle="pill"
                          to="/createaccountinfluencer"
                        >
                          Influencer
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="data-tabs-content">
                    <div className="tab-content mt-3">
                      <div id="Influencer" className="tab-pane active">
                        <h1>Sign up</h1>
                        <p>
                          Already have an account?{" "}
                          <Link to="/login">Log in</Link>
                        </p>
                        <form>
                          <div className="form-group field">
                            <input
                              type="text"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="form-control email"
                              placeholder="Email Id"
                            />
                          </div>
                          <div className="form-group field">
                            <input
                              type="text"
                              id="mobileNumber"
                              name="mobileNumber"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              required
                              className="form-control mobile"
                              placeholder="mobileNumber No."
                            />
                          </div>
                          <div className="form-group field mb25">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              className="form-control pass"
                              placeholder="Password/OTP"
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <button
                              type="button"
                              onClick={submitForm}
                              className="btn btn-info"
                            >
                              Signup
                            </button>
                            <Link to="/login" className="forgot-password">
                              Forgot Password?
                            </Link>
                          </div>
                          <div className="or">- OR -</div>
                          <br />
                          <div className="social-login d-flex justify-content-center">
                            <div>
                              <GoogleLogin
                                onSuccess={async credentialResponse => {
                                  const data = credentialResponse.credential;
                                  try {
                                    const res = await axios.post(
                                      `${baseURL}/user/googleAuthenticate`,
                                      {
                                        authorizationCode: data,
                                        role: "ROLE_INFLUENCER",
                                      }
                                    );
                                    console.log(res, "response");
                                    if (res.status === 201) {
                                      toast.success("Log In Successfully");
                                      localStorage.setItem(
                                        "token",
                                        JSON.stringify({
                                          accessToken: res.data.accessToken,
                                          idToken: res.data.idToken,
                                        })
                                      );
                                      navigate("/influencercreate");
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  }
                                }}
                              />
                              ;
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Createaccountinfluencer;
