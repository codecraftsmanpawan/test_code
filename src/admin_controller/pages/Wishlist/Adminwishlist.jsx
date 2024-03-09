import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { baseURL } from "../../../hooks/config";

const Adminwishlist = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [wishlistData, setWishlistData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${baseURL}/wishlist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setWishlistData(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch wishlist data");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`${baseURL}/wishlist/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the deletion is successful, fetch updated wishlist data
        toast.success("Item removed from wishlist");
        fetchData();
      } else {
        toast.error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <>
      <div className="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <h1 className="page-title">Wishlist</h1>
            </div>
            <div className="page-inner influencers">
              <div className="content-wrapper">
                <div className="form-row">
                  {wishlistData ? (
                    wishlistData?.influencers?.map((influencer) => (
                      <div className="col-md-3 col-sm-6" key={influencer.id}>
                        <div className="card">
                          <div className="profile-inf avatar-lg">
                            <img
                              src={influencer?.influencerPic.pathUri}
                              alt="Profile"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                          <Link to={`/${influencer.id}`}>
                            <h2 className="card-title">
                              {influencer?.influencerName}
                            </h2>
                            <p className="designation">
                              Followers: {influencer?.followerRange}
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
                                <a href={influencer?.youtube}>
                                  <img
                                    src="assets/images/inf-youtube.svg"
                                    alt="Youtube"
                                  />
                                </a>
                                <a
                                  href={influencer?.facebook}
                                  className="social-link"
                                >
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
                                <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                                Delhi, India
                              </div>
                              <div className="inl-wishlist active">
                                <a href="#"onClick={() => handleDelete(influencer.id)}> <i className="las la-heart" /></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Adminwishlist;
