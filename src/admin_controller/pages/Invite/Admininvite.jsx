import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";
import { baseURL } from "../../../hooks/config";

const Admininvite = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [campaignInvites, setCampaignInvites] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [uniqueInfluencerIds, setUniqueInfluencerIds] = useState(new Set());

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${baseURL}/campaigns`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setCampaignInvites(result);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    const fetchInfluencers = async () => {
      try {
        const response = await fetch(
          `${baseURL}/restricted/influencers`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setInfluencers(result);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };

    fetchCampaigns();
    fetchInfluencers();
  }, []);

  useEffect(() => {
    setUniqueInfluencerIds(new Set(influencers.map(influencer => influencer.id)));
  }, [influencers]);

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
          toast.success("Removed from wishlist");
          const updatedWishlist = wishlist.filter(item => item.id !== id);
          setWishlist(updatedWishlist);
        } else {
          toast.success("Added to wishlist");
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
    <>
      <div className="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <h1 className="page-title">All Invites</h1>
            </div>
            <div className="page-inner influencers">
              <div className="content-wrapper">
                <div className="form-row">
                  {[...uniqueInfluencerIds].map((id, index) => {
                    const influencer = influencers.find(item => item.id === id);
                    if (!influencer) return null; 
                    return (
                      <div
                        key={`${id}-${index}`}
                        className="col-md-3 col-sm-6 mb-4"
                      >
                        <div className="card">
                          <div className="profile-inf avatar-lg">
                            <img
                              src={influencer?.influencerPic.pathUri}
                              alt="Profile"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                          <Link to="#">
                            <h2 className="card-title">
                              {influencer && influencer.influencerName}
                            </h2>
                            <p className="designation">
                              Followers:{" "}
                              {influencer && influencer.followerRange}
                            </p>
                          </Link>
                          <div className="card-body">
                          <div className="social_link">
                            <div>
                              <a href="">
                                <img
                                  src="assets/images/inf-instagram.svg"
                                  alt="Instagram"
                                />
                              </a>
                              <a href="">
                                <img
                                  src="assets/images/inf-youtube.svg"
                                  alt="Youtube"
                                />
                              </a>
                              <a href="" className="social-link">
                                <img
                                  src="assets/images/inf-facebook.svg"
                                  alt="Facebook"
                                />
                              </a>
                              <a href="">
                                <img
                                  src="assets/images/inf-twitter.svg"
                                  alt=""
                                />
                              </a>
                            </div>
                            </div>
                            <div className="inf-footer">
                              <div className="inl-location">
                                <i className="fa-sharp fa-solid fa-location-dot" />{" "}
                                Delhi, India
                              </div>
                              <div className="inl-wishlist">
                                <a onClick={() => handleWishlist(influencer.id)} style={{cursor:"pointer"}}>
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
                    );
                  })}
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

export default Admininvite;
