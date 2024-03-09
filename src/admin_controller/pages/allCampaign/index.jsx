import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { parseJwt } from "../../../utils/common";
import { baseURL } from "../../../hooks/config";

const AllCampaignAdmin = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const data = parseJwt(token);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campaignsId, setCampaignsId] = useState();
  const [inviteBox, setInviteBox] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [influencers, setInfluencers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${baseURL}/campaigns`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setCampaigns(result);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${baseURL}/restricted/influencers`,
          requestOptions
        );
        const data = await response.json();
        setInfluencers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckbox = (id) => {
    if (!inviteBox.includes(id)) {
      setInviteBox((prevBox) => [...prevBox, id]);
    } else {
      setInviteBox((prevBox) => prevBox.filter((influencerId) => influencerId !== id));
    }
  };

  const deleteCampaign = async (id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseURL}/campaign/${id}`,
        requestOptions
      );
      if (response.ok) {
        const updatedCampaigns = campaigns.filter((campaign) => campaign.id !== id);
        setCampaigns(updatedCampaigns);
        toast.success("Campaign deleted successfully");
      } else {
        toast.error("Failed to delete campaign");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const confirmDelete = (id) => {
    toast(
      <div className="confirm-toast">
        <p>Are you sure you want to delete this campaign?</p>
        <button
          className="btn inflcrbtn mr-2"
          onClick={() => {
            deleteCampaign(id);
            toast.dismiss();
          }}
        >
          Yes
        </button>
        <button className="btn btn-secondary" onClick={() => toast.dismiss()}>
          No
        </button>
      </div>,
      { autoClose: false }
    );
  };

  const handlePostInvite = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      const sendInvitation = async (id) => {
        try {
          const response = await fetch(
            `${baseURL}/campaign/invite/${campaignsId}/${id}`,
            requestOptions
          );

          if (response.status === 409) {
            toast.error(`Influencer ${id} has already been invited`);
          } else if (response.ok) {
            toast.success(`Invite sent to user ${id}`);
            window.location.reload();
          } else {
            toast.error(`Failed to invite ${id}`);
          }
        } catch (error) {
          console.error("Error inviting user:", error);
        }
      };

      inviteBox.forEach((id) => {
        sendInvitation(id);
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB", options);
  };
  const handleWishlist = async (id) => {
    let isInWishlist; // Define isInWishlist here

    try {
      isInWishlist = wishlist.some(
        (wishlistItem) => wishlistItem?.id === id
      );
      const requestOptions = {
        method: isInWishlist ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      };

      const response = await fetch(
        `${baseURL}/wishlist/${id}`,
        requestOptions
      );

      if (response.ok) {
        if (isInWishlist) {

          const updatedWishlist = wishlist.filter(item => item.id !== id);
          setWishlist(updatedWishlist);
        } else {

          const influencer = influencers.find((item) => item.id === id);
          if (!influencer) {
            toast.error("Influencer not found");
            return;
          }
          setWishlist([...wishlist, influencer]);
        }
      } else {
        toast.error(isInWishlist ? "Failed to remove from wishlist" : "Failed to add to wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error(isInWishlist ? "Failed to remove from wishlist" : "Failed to add to wishlist");
    }
  };

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const response = await fetch(`${baseURL}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        });

        if (response.ok) {
          const result = await response.json();
          setWishlist(result.influencers);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };

    getWishlist();
  }, [token]);

  return (
    <div>
      <div className="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <h1 className="page-title">Your Campaigns</h1>
              <div className="expor-data ml-auto">
                <Link to="/createcampaignadmin" className="btn2 btn-sm">
                  Create Campaign
                </Link>
              </div>
            </div>
            <div className="page-inner">
              <div className="content-wrapper">
                <div className="dasboard-table content_FLX_mdl mt10">
                  {loading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "50vh" }}
                    >
                      <div>
                        <h1>Loading.....</h1>
                      </div>
                    </div>
                  ) : (
                    <table
                      id="example2"
                      className="table table-striped dt-responsive nowrap"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Sl.</th>
                          <th>Preview</th>
                          <th>Campaigns Name</th>
                          <th>Brand Name</th>
                          <th>Genre</th>
                          <th>Social Media</th>
                          <th width="100">
                            <Link
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                              href="#"
                              aria-expanded="false"
                            >
                              Status
                            </Link>
                            <ul className="dropdown-menu animated fadeIn">
                              <div className="dropdown-user-scroll scrollbar-outer">
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Active
                                  </Link>
                                  <div className="dropdown-divider"></div>
                                  <Link className="dropdown-item" href="#">
                                    Pending
                                  </Link>
                                </li>
                              </div>
                            </ul>
                          </th>
                          <th>Country</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((campaign, index) => (
                          <tr key={campaign.id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={campaign.campaignPic.pathUri}
                                alt={campaign.campaignPic.pathUri}
                                style={{
                                  maxWidth: "40px",
                                  maxHeight: "100px",
                                }}
                              />
                            </td>
                            <td>{campaign.campaignName}</td>
                            <td>{campaign.brandName}</td>
                            <td>{campaign.genres.join(", ")}</td>
                            <td>{campaign.socialMedia}</td>
                            <td>
                              <span
                                className={
                                  campaign.status
                                    ? "text-success"
                                    : "text-warning"
                                }
                              >
                                {campaign.status ? "Active" : "Pending"}
                              </span>
                            </td>
                            <td>{campaign.country}</td>
                            <td>{formatDate(campaign.startDate)}</td>
                            <td>{formatDate(campaign.endDate)}</td>
                            <td
                              className="action"
                              style={{ gap: "5px", display: "flex" }}
                            >
                              <Link to={`/Campainedit/${campaign.id}`}>
                                <img
                                  src="assets/images/edit.svg"
                                  style={{ width: "20px", height: "24px" }}
                                  alt="Edit"
                                />
                              </Link>
                              <Link
                                data-toggle="modal"
                                data-target="#fullscreenModal"
                                onClick={() => {
                                  setCampaignsId(campaign.id);
                                  setBrandName(campaign.brandName);
                                  setCampaignName(campaign.campaignName);
                                }}
                              >
                                <img
                                  src="assets/images/invite.svg"
                                  style={{ width: "25px", height: "20px" }}
                                  alt="Invite"
                                />
                              </Link>
                              {campaign.status && (
                                <Link href="#" onClick={() => campaign.id}>
                                  <img
                                    src="assets/images/pause.svg"
                                    style={{ width: "20px", height: "20px" }}
                                    alt="Pause"
                                  />
                                </Link>
                              )}
                              <Link
                                href="#"
                                onClick={() => confirmDelete(campaign.id)}
                              >
                                <img
                                  src="assets/images/deletet.png"
                                  style={{ width: "20px", height: "17px" }}
                                  alt="Delete"
                                />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal  show"
          id="fullscreenModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="fullscreenModalLabel"
          aria-hidden="true"
          style={{ transition: "opacity 0.2s linear" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-fullscreen"
            role="document"
          >
            <div className="modal-content " >
              <div className="modal-header">
                <h5 className="modal-title" id="fullscreenModalLabel">
                  Send Invite Influencers - {brandName} invite for campaign
                  {campaignName}
                </h5>
              </div>
              <div className="modal-body">
                <div className="" >
                  <div className="content">
                    <div className="page-inner influencers">
                      <div className="content-wrapper">
                        <div className="form-row">
                          {influencers.map(influencer => (
                            <div
                              className="col-md-3 col-sm-6"
                              key={influencer.id}
                            >
                              <div className="card">
                                <div className="custom-control custom-checkbox infl">
                                  <input
                                    className="custom-control-input"
                                    style={{ cursor: "pointer" }}
                                    type="checkbox"
                                    value={inviteBox.includes(influencer.id)}
                                    id={`flexCheckDefault_${influencer.id}`}
                                    onChange={() => {
                                      handleCheckbox(influencer.id);
                                    }}
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor={`flexCheckDefault_${influencer.id}`}
                                  ></label>
                                </div>
                                <NavLink to={`/${influencer.id}`}>
                                  <div className="profile-inf avatar-lg">
                                    <img
                                      src={influencer?.influencerPic.pathUri}
                                      alt="Profile"
                                      className="avatar-img rounded-circle"
                                    />
                                  </div>
                                  <h2 className="card-title">
                                    {influencer.influencerName}
                                  </h2>
                                  <p className="designation">
                                    Followers: {influencer?.followerRange}
                                  </p>
                                </NavLink>
                                <div className="card-body">
                                  <div className="social_link">
                                    <NavLink to={influencer.instagram}>
                                      <img
                                        src="assets/images/inf-instagram.svg"
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
                                    <div className="inl-wishlist">
                                      <a onClick={() => handleWishlist(influencer.id)} style={{ cursor: "pointer" }}>
                                        <i
                                          className="las la-heart"
                                          style={{
                                            color: wishlist.some((wishlistItem) => wishlistItem.id === influencer.id)
                                              ? "red"
                                              : "inherit",
                                          }}
                                        ></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed-bottom d-flex justify-content-end mb-3 mr-3">
                <button
                  type="button"
                  className="btn btn-secondary mr-3"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn2 mr-3"
                  data-target="#Campaign-Success"
                  data-toggle="modal"
                  type="submit"
                  onClick={handlePostInvite}
                >
                  Send Invite
                </button>
              </div>

            </div>
          </div>
        </div>
        <style>{`
        .modal-fullscreen {
          width: 100vw;
          max-width: 100%;
          margin: 0;
        }
        
        .modal-fullscreen .modal-content {
          height: 100%;
          border-radius: 0;
        }
      `}</style>
      </div>
    </div>
  );
};

export default AllCampaignAdmin;
