import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../hooks/authProvider";
import axios from "axios";
import {GoogleLogin} from "@react-oauth/google";
import {toast} from "react-toastify";
import {parseJwt} from "../utils/common";
import { baseURL } from "../hooks/config";
const Login = () => {
  const {
    token,
    username,
    setUserName,
    password,
    setPassword,
    LoginInputHandle,
    LogOutHandle,
  } = useAuth();
  const navigate = useNavigate();
  const [roleCss, setRoleCss] = useState(false);
  const [roleOpt, setRoleOpt] = useState("ROLE_INFLUENCER");

  // login()

  return (
    <>
      <section className="login-wrapper">
        <div className="login-form">
          <div className="container">
            <Link className="theme-logo" to="/">
              <img
                src="assets/images/logo.png"
                alt="Project & Resource Tracking System Logo"
              />
            </Link>
            <div className="form_sect">
              <h1>Log in</h1>
              <p>
                Don't have an account?{" "}
                <Link to="/createaccount">Create an account</Link>
              </p>
              <form action="" onSubmit={e => e.preventDefault()}>
                <div className="form-group field">
                  <input
                    type="email"
                    name="email"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                    className="form-control email"
                    placeholder="Email Id/Mobile"
                  />
                </div>
                <div className="form-group field mb30">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control pass"
                    placeholder="Password/OTP"
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {" "}
                  {token ? (
                    <>
                      <span>already login </span>
                      <button className="btn btn-info" onClick={LogOutHandle}>
                        Log Out
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-info" onClick={LoginInputHandle}>
                      Log in
                    </button>
                  )}
                  <Link to="/login" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                <div className="or">- OR -</div>
                <br />
                <div className="social-login d-flex justify-content-center">
                  <div>
                    <div
                      className={` lo ${
                        roleCss ? "form_sect " : "role_optionUpdated"
                      }`}
                    >
                      <GoogleLogin
                        onSuccess={async credentialResponse => {
                          const data = credentialResponse.credential;
                          try {
                            const res = await axios.post(
                              `${baseURL}/user/googleAuthenticate`,
                              {
                                authorizationCode: data,
                                role: roleOpt,
                              }
                            );
                            const accessToken = res.data.accessToken;
                            const accessTokenParse = parseJwt(accessToken);
                            if (res.status === 201) {
                              toast.success("Log In Successfully", {
                                position: toast.POSITION.BOTTOM_CENTER,
                              });
                              localStorage.setItem(
                                "token",
                                JSON.stringify({
                                  accessToken: res.data.accessToken,
                                  idToken: res.data.idToken,
                                })
                              );
                              if (accessTokenParse.roles[0] === "ROLE_BRAND") {
                                navigate("/dashboardbrand");
                              } else if (
                                accessTokenParse.roles[0] === "ROLE_INFLUENCER"
                              ) {
                                navigate("/dashboardinfluencer");
                              }
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      />
                      ;
                      {/* <button className="btn btn-info" onClick={ 

                        }> */}
                      {/* </button> */}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default Login;
