import {Link} from "react-router-dom";
import Header from "../component/Header";
import React, {useEffect, useState} from "react";
import GetInfluencers from "../GetDataFunctions/GetInfluencers";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../pureFunctions/useDocumentTitle";
import Sidebar from "../component/Sidebar";
import { baseURL } from "../hooks/config";

const Wishlist = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  useDocumentTitle("Sociopuff : wishlist");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const response = await fetch(`${baseURL}/wishlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          redirect: "follow",
        });

        if (response.ok) {
          const result = await response.json();
          const authenticatedUrls = await Promise.all(
            result.influencers.map(async item => {
              const authenticatedUrl = await getAuthenticatedImageUrl(
                item.influencerFiles[0].pathUri
              );
              return {
                ...item,
                authenticatedUrl,
              };
            })
          );
          setWishlist(authenticatedUrls);
        } else {
          console.error("Failed to fetch wishlist");
          // Handle error or show an error message
        }
      } catch (error) {
        console.error("Error fetching wishlist", error);
        // Handle error or show an error message
      }
    };

    getWishlist();
  }, [token]);
  const getAuthenticatedImageUrl = async pathUri => {
    try {
      const response = await fetch(pathUri);

      if (response.ok) {
        const blob = await response.blob();
        const authenticatedUrl = URL.createObjectURL(blob);
        return authenticatedUrl;
      } else {
        console.error(`Failed to fetch image URL: ${pathUri}`);
        // Handle error or show an error message
        return "";
      }
    } catch (error) {
      console.error("Error fetching image URL", error);
      // Handle error or show an error message
      return "";
    }
  };

  const showConfirmationToast = items => {
    toast.info(
      <div className="confirmation-toast">
        <h5>Confirm Deletion</h5>
        <p>
          Are you sure you want to remove {items.influencerName} from your
          wishlist?
        </p>
        <div className="button-container">
          <button
            className="btn btn2 mr-1"
            onClick={() => handleDeleteConfirmed(items)}
          >
            Yes
          </button>
          <button className="btn btn2 mr-1" onClick={toast.dismiss}>
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: "custom-toast-class",
      }
    );
  };

  const handleDeleteConfirmed = async items => {
    toast.dismiss();

    setWishlist(oldValues => {
      return oldValues.filter(item => item.id !== items.id);
    });

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.accessToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${baseURL}/wishlist/${items.id}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        toast.success("Removed from wishlist successfully");
      } else {
        console.error("Failed to remove from wishlist");
        // Handle error or show an error message
      }
    } catch (error) {
      console.error("Error removing from wishlist", error);
      // Handle error or show an error message
    }
  };
  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt20">
              <h1 className="page-title">Wishlist</h1>
            </div>
            <div className="page-inner influencers">
              <div className="content-wrapper">
                <div className="form-row">
                  {wishlist &&
                    wishlist.map(items => (
                      <div className="col-md-3 col-sm-6" key={items.id}>
                        <div className="card">
                          
                          <div className="profile-inf avatar-lg">
                            <img
                              src={items?.influencerPic.pathUri}
                              alt="Profile"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                          <a href={`/${items.id}`}>
                            <h2 className="card-title">
                              {items.influencerName}
                            </h2>
                            <p className="designation">
                              Followers: {items.followerRange}
                            </p>
                          </a>
                          <div className="card-body">
                            <div className="social_link">
                          
                              <a href={items.instagram}>
                                <img
                                  src="assets/images/inf-instagram.svg"
                                  alt="Instagram"
                                />
                              </a>
                              <a href={items.youtube}>
                                <img
                                  src="assets/images/inf-youtube.svg"
                                  alt="Youtube"
                                />
                              </a>
                              <a href={items.facebook} className="social-link">
                                {/* Apply the social-link class to add margin */}
                                <img
                                  src="assets/images/inf-facebook.svg"
                                  alt="Facebook"
                                />
                              </a>
                              <a href={items.twitter}>
                                  <img
                                    src="assets/images/inf-twitter.svg"
                                    alt=""
                                  />
                                </a>
                            </div>

                            <div className="inf-footer">
                              <div className="inl-location">
                                <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                                Delhi, India
                              </div>
                              <div className="inl-wishlist active">
                                <a style={{cursor:"pointer"}}  onClick={() => showConfirmationToast(items)}>
                                  <i className="las la-heart" />
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
      <ToastContainer />
    </>
  );
};

export default Wishlist;
