import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {GoogleLogin} from "@react-oauth/google";
import { baseURL } from "../hooks/config";
const Createaccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    mobileNumber: "",
    password: "",
    roles: ["ROLE_BRAND"],
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

    try {
      const res = axios.post(`${baseURL}/user/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      res && console.log(res, "response");
      toast.success("Registration successful!");
      navigate("/login");
      setFormData({
        email: "",
        mobileNumber: "",
        password: "",
        roles: [""],
        provider: "",
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.", error);
    }
  };

  
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
                  className="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="data-tabs">
                    <ul className="nav mb-6" role="tablist">
                      <li className="nav-item brand active">
                        <Link
                          className="nav-link"
                          data-toggle="pill"
                          to="/createaccount"
                        >
                          Brand
                        </Link>
                      </li>
                      <li className="nav-item influencer">
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
                      <div id="Brand" className="tab-pane active">
                        <h1>Sign up</h1>
                        <p>
                          Already have an account?{" "}
                          <Link to="/login">Log in</Link>
                        </p>
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
                            onClick={submitForm}
                            className="btn btn2 btn-info"
                          >
                            Signup
                          </button>

                          <Link to="/" className="forgot-password">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="or">- OR -</div>
                        <div className="social-login">
                          <br />
                          <div className="form-group d-flex  justify-content-center">
                            <div>
                              <GoogleLogin
                                onSuccess={async credentialResponse => {
                                  const data = credentialResponse.credential;
                                  try {
                                    const res = await axios.post(
                                      `${baseURL}/user/googleAuthenticate`,
                                      {
                                        authorizationCode: data,
                                        role: "ROLE_BRAND",
                                      }
                                    );
                                    if (res.status === 201) {
                                      toast.success("Log In Successfully");
                                      localStorage.setItem(
                                        "token",
                                        JSON.stringify({
                                          accessToken: res.data.accessToken,
                                          idToken: res.data.idToken,
                                        })
                                      );

                                      navigate("/createcampaign");
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  }
                                }}
                              />
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
        </div>
      </section>
    </div>
  );
};

export default Createaccount;
