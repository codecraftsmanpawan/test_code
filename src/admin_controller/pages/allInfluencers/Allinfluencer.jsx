import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { parseJwt } from "../../../utils/common";
import { toast } from "react-toastify";
import { baseURL } from "../../../hooks/config";

const Allinfluencer = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const data = parseJwt(token);
  const [influencers, setInfluencers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchInfluencers = async () => {
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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setInfluencers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInfluencers();
  }, []);
  
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
    <div>
      <div className="wrapper influencers_sect">
        <AdminHeader />
        <AdminSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <h1 className="page-title">Influencers</h1>
            </div>
            <div className="page-inner influencers">
              <div className="content-wrapper">
                <div className="form-row">
                  {influencers.map((influencer) => (
                    <div className="col-md-3 col-sm-6" key={influencer.id}>
                      <div className="card">
                
                        <div className="profile-inf avatar-lg">
                          <img
                            className="avatar-img rounded-circle"
                            src={influencer.influencerPic.pathUri}
                            alt=""
                          />
                        </div>
                        <h2 className="card-title">
                          {influencer.influencerName}
                        </h2>
                        <p className="designation">
                          Followers: {influencer.followerRange}
                        </p>
                        <div className="card-body">
                          <div className="social_link">
                            <a href={influencer.instagram}>
                              <img
                                src="assets/images/inf-instagram.svg"
                                alt=""
                              />
                            </a>
                            <a href={influencer.youtube}>
                              <img
                                src="assets/images/inf-youtube.svg"
                                alt=""
                              />
                            </a>
                            <a href={influencer.facebook}>
                              <img
                                src="assets/images/inf-facebook.svg"
                                alt=""
                              />
                            </a>
                            <a href={influencer.twitter}>
                              <img
                                src="assets/images/inf-twitter.svg"
                                alt=""
                              />
                            </a>
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
                  ))}
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allinfluencer;
