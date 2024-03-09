import React, {useState, useEffect} from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import useDocumentTitle from "../pureFunctions/useDocumentTitle";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import {useType} from "../hooks/type-context";

const Influencerdetail = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const {influencerId} = useParams();
  const {typeState} = useType();
  const {allInfluencers} = typeState;
  const [images, setImages] = useState([]);

  const influencerdetail = allInfluencers.filter(
    influencer => influencer.id.toString() === influencerId
  );

  useDocumentTitle(`influencer details`);

  return (
    <>
      <div className="wrapper ">
        <Header />
        <Sidebar />
        <div className="main-panel">
          {influencerdetail &&
            influencerdetail.map((influencer, index) => (
              <div className="content" key={index}>
                <div className="page-header mt20">
                  <h1 className="page-title">{influencer.influencerName}</h1>
                  <Link href="#" className="ml-auto dt-link">
                    <i className="fa-solid fa-heart fa-fw" /> Wishlist
                  </Link>
                  <Link
                    href="#"
                    className="ml-3 dt-link"
                    data-target="#Invite-Influencers"
                    data-toggle="modal"
                  >
                    <i className="fa-solid fa-plus fa-fw" /> Invite
                  </Link>
                </div>
                <div className="page-inner infl-detail">
                  <div className="content-wrapper">
                    <div className="inl-det-img-sect">
                      <div className="image-sm-sect">
                        <div className="image1">
                          <img
                            src={`${influencer.influencerFiles[0]?.pathUri}` || "assets/images/demo-img-sm.jpg"}
                            alt={`${influencer.influencerFiles[0]?.id}`}
                            style={{height: "225px"}}
                          />
                        </div>
                        <div className="image2">
                          <img
                            src={`${influencer.influencerFiles[1]?.pathUri}` || "assets/images/demo-img-sm.jpg"}
                            alt={`${influencer.influencerFiles[1]?.id}`}
                            style={{height: "225px"}}
                          />
                        </div>
                      </div>
                      <div className="image-md-sect">
                        <img
                          src={influencer.influencerFiles[2]?.pathUri || "assets/images/demo-img-sm.jpg"}
                          alt={` ${influencer.influencerFiles[2]?.id}`}
                          style={{height: "455px"}}
                        />
                      </div>

                      <div className="image-sm-sect">
                        <div className="image3">
                          <img
                            src={influencer?.influencerFiles[3]?.pathUri || "assets/images/demo-img-sm.jpg"}
                            alt={` ${influencer.influencerFiles[3]?.id}`}
                            style={{height: "225px"}}
                          />
                        </div>
                        <div className="image4">
                          <img
                            src={influencer.influencerFiles[4]?.pathUri || "assets/images/demo-img-sm.jpg "}
                            alt={` ${influencer.influencerFiles[4]?.id}`}
                            style={{height: "225px"}}
                          />
                        </div>
                      </div>
                    </div>

                    <h2 className="page-title d-flex">
                      {influencer.niches.map(niche => (
                        <p className="m-2">{niche},</p>
                      ))}
                    </h2>
                    <p className="mt15 ml-2">
                    {influencer.tiktok}
                    </p>
                    <div className="form-row mt-5">
                      <div className="col-md-5">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex align-content-center">
                              <div className="profile-inf">
                                <img
                                  src={` ${influencer.influencerPic.pathUri}`}
                                  alt={` ${influencer.influencerPic.id}`}
                                  className="avatar-img rounded-circle"
                                />
                              </div>
                              <div className="ml-3 w-71">
                                <h2 className="card-title">
                                  {influencer.influencerName}
                                </h2>
                                <div className="d-flex align-content-center">
                                  <div className="mr-3">
                                    <p className="designation mt-2 mb-2">
                                    {influencer.gender}
                                    </p>
                                    <p>{influencer.followerRange}</p>
                                  
                                  </div>
                                  <div className="ml-auto">
                                    <div className="social_link mt-2">
                                      <NavLink
                                        to={influencer.instagram}
                                        className="ml-0"
                                      >
                                        <img
                                          src="assets/images/inf-instagram.svg"
                                          alt=""
                                        />
                                      </NavLink>
                                      <NavLink
                                        to={influencer.youtube}
                                        className="ml-0"
                                      >
                                        <img
                                          src="assets/images/inf-youtube.svg"
                                          alt=""
                                        />
                                      </NavLink>
                                      <NavLink
                                        to={influencer.facebook}
                                        className="ml-0"
                                      >
                                        <img
                                          src="assets/images/inf-facebook.svg"
                                          alt=""
                                        />
                                      </NavLink>
                                      <NavLink
                                        to={influencer.twitter}
                                        className="ml-0"
                                      >
                                        <img
                                          src="assets/images/inf-twitter.svg"
                                          alt=""
                                        />
                                      </NavLink>
                                    </div>
                                    <div className="inl-location mt-2">
                                      <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                                      Delhi, India
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="card">
                          <div className="card-body">
                            <div className="form-row">
                              <div className="col-md-6">
                                <p className="fw-600 d-flex flex-wrap">
                                  {influencer.campaignType.map(campaignType => (
                                    <p className="m-2">{campaignType},</p>
                                  ))}
                                </p>
                                <div className="sort-price">$200</div>
                                <div className="small">
                                  SOCIOPFF handling fee of 15% of the fee
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <select className="custom-select">
                                    <option selected>Story Post</option>
                                    <option>Example 1</option>
                                    <option>Example 2</option>
                                    <option>Example 3</option>
                                  </select>
                                </div>
                                <p className="fs12 m-0">
                                  1-2 story posts, either photo or video, with
                                  tags and mentions. Can include swipe-up links
                                  as well.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row mt-4 align-items-center">
                      <div className="col-md-3">
                        <select className="custom-select">
                          <option selected>All Packages</option>
                          {influencer.packages.map((packageItem, index) => (
                            <option key={index}>{`Package ${index + 1}: ${
                              packageItem.platform
                            }`}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-3">
                        <select className="custom-select">
                          <option selected>Campaign Type</option>
                          {influencer.campaignType.map((type, index) => (
                            <option key={index}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-3">
                        <i className="fa-solid fa-circle-info"></i> How does it
                        work?
                      </div>
                    </div>
                    <div
                      className="form-row mt-4"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {influencer.packages.map((packageItem, index) => (
                        <div className="col-md-4" key={index}>
                          <h6 style={{marginTop: "10px", marginLeft: "10px"}}>
                            Package {index + 1}
                          </h6>
                          <div className="card inl-prices">
                            <div className="card-body">
                              <div className="top">
                                <div>
                                  <div className="social-title">
                                    {packageItem.platform}
                                  </div>
                                  <div className="price">
                                    {packageItem.packageOffering}
                                  </div>
                                </div>
                                <div className="price">
                                  ${packageItem.price}
                                </div>
                                <div className="custom-control custom-radio">
                                  <input
                                    type="radio"
                                    className="custom-control-input"
                                    id={`radio${index + 1}`}
                                    name="example"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={`radio${index + 1}`}
                                  ></label>
                                </div>
                              </div>
                              <p>{packageItem.describeYourselfPackage}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="copyright_text">
                    © 2023, Sociopuff. All Rights Reserved
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Influencerdetail;
