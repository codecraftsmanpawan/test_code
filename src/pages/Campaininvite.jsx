import {Link} from "react-router-dom";
import Header from "../component/Header";
import React, {useState} from "react";
import {NavLink, useParams} from "react-router-dom";

import useDocumentTitle from "../pureFunctions/useDocumentTitle";
import {useType} from "../hooks/type-context";
import {toast} from "react-toastify";
import Sidebar from "../component/Sidebar";
import { baseURL } from "../hooks/config";

const Campaininvite = () => {
  useDocumentTitle("campaign-invities-influencers");
  const token = JSON.parse(localStorage.getItem("token"));
  const {campaignId} = useParams();
  const [inviteBox, setInviteBox] = useState([]);

  const [inviteCheck, setInviteCheck] = useState(true);

  const handlePostIinvitie = () => {
    const newSetData = new Set([...inviteBox]);

    // console.log(newSetData);
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token.idToken}`);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
        };
        const der = async x => {
          const response = await fetch(
            `${baseURL}/campaign/invite/${campaignId}/${x}`,
            requestOptions
          );
          const result = await response.json();

          toast(result.status);
        };
        newSetData.forEach(async id => await der(id));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };

  function handleCheckbox(id) {
    setInviteCheck(!inviteCheck);
    if (inviteCheck) {
      setInviteBox([...inviteBox, id]);
    }
  }

  const {typeState} = useType();
  const {allInfluencers} = typeState;

  return (
    <>
      <div class="wrapper">
        <Header />
        <Sidebar />
        <div className="main-panel wishlist">
          <div className="content">
            <div className="page-header mt10 pl-0 d-flex justify-content-between align-items-center">
              <h1 className="page-title">campaign {}</h1>
              <div className="mt-2">
                <button
                  className="btn btn2 mr-1"
                  data-target="#Campaign-Success"
                  data-toggle="modal"
                  type="submit"
                  onClick={handlePostIinvitie}
                >
                  Send Invite
                </button>
              </div>
            </div>
            <div className="page-inner influencers">
              <div className="content-wrapper">
                <div className="form-row">
                  {allInfluencers &&
                    allInfluencers.map(influencer => (
                      <div className="col-md-3 col-sm-6" key={influencer.id}>
                        <div className="card">
                          <div className="custom-control custom-checkbox infl">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={inviteCheck}
                              id="flexCheckDefault"
                              onChange={() => handleCheckbox(influencer.id)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            ></label>
                          </div>
                          <div className="profile-inf avatar-lg">
                            <img
                              className="avatar-img rounded-circle"
                              src="assets/images/inf2.jpg"
                              alt=""
                            />
                          </div>
                          <h2 className="card-title">
                            {influencer.influencerName}
                          </h2>
                          <p className="designation">{influencer.niches[0]}</p>
                          <div className="card-body">
                            <div className="social_link">
                              <NavLink to={influencer.instagram}>
                                <img
                                  src="../../public/assets/images/inf-instagram.svg"
                                  alt=""
                                />
                              </NavLink>
                              <NavLink to={influencer.youtube}>
                                <img
                                  src="assets/images/inf-youtube.svg"
                                  alt=""
                                />
                              </NavLink>
                              <NavLink to={influencer.facebook}>
                                <img
                                  src="assets/images/inf-facebook.svg"
                                  alt=""
                                />
                              </NavLink>
                              <NavLink to="/">
                                <img
                                  src="assets/images/inf-twitter.svg"
                                  alt=""
                                />
                              </NavLink>
                            </div>

                            <div className="inf-footer">
                              <div className="inl-location">
                                <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                                Delhi, India
                              </div>
                              <div className="inl-wishlist active">
                                <NavLink to="/">
                                  <i className="las la-heart"></i>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-2">
                  <button
                    className="btn btn2 mr-1"
                    data-target="#Campaign-Success"
                    data-toggle="modal"
                    type="submit"
                  >
                    Send Invite{" "}
                  </button>
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Campaininvite;
