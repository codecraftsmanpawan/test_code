import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Influencerheader from "../component/Influencerheader";
import InfluencerSidebar from "../component/InfluencerSidebar";
import { baseURL } from "../hooks/config";

const Influencerinfluencers = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [influencers, setInfluencers] = useState([]);
  const [influencerData, setInfluencerData] = useState(null);
  const [randomInfluencers, setRandomInfluencers] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(`${baseURL}/restricted/influencers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setInfluencers(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching influencers:", error);
      }
    };

    const fetchInfluencerData = async () => {
      try {
        const response = await fetch(`${baseURL}/influencer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.influencerFiles && result.influencerFiles.length > 0) {
          setInfluencerData(result);
        } else {
          console.error("No influencerFiles found in the influencer data.");
        }
      } catch (error) {
        console.error("Error fetching influencer data:", error);
      }
    };

    fetchInfluencers();
    fetchInfluencerData();
  }, [token.idToken]);

  useEffect(() => {
    const matchingInfluencers = influencers.filter(influencer =>
      influencer.niches.some(niche => influencerData?.niches.includes(niche))
    );

    const getRandomInfluencers = (arr, count) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setRandomInfluencers(getRandomInfluencers(matchingInfluencers, 8));
  }, [influencers, influencerData]);

  const fetchImage = async pathUri => {
    try {
      const response = await fetch(pathUri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.idToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized. Re-authenticate or handle accordingly.");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <>
      <div className="wrapper influencers_sect">
        <Influencerheader />
        <InfluencerSidebar />

        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <h1 className="page-title">Similar Influencers</h1>
            </div>
            <div className="page-inner influencers">
              <div className="content-wrapper">
                <div className="form-row">
                  {randomInfluencers.map(influencer => (
                    <div className="col-md-3 col-sm-6" key={influencer.id}>
                      <div className="card">
                        <div className="profile-inf avatar-lg">
                          <img
                            className="avatar-img rounded-circle"
                            src={influencer?.influencerPic.pathUri}
                            alt=""
                          />
                        </div>

                        <h2 className="card-title">
                          {influencer.influencerName}
                        </h2>

                        <p className="designation">
                          Followers :{influencer.followerRange}
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
                              <img src="assets/images/inf-youtube.svg" alt="" />
                            </a>
                            <a href={influencer.facebook}>
                              <img
                                src="assets/images/inf-facebook.svg"
                                alt=""
                              />
                            </a>
                            <a href={influencer.twitter}>
                              <img src="assets/images/inf-twitter.svg" alt="" />
                            </a>
                          </div>
                          <div className="d-flex flex-column mb-3"></div>
                          <div className="inf-footer">
                            <div className="inl-location">
                              <i className="fa-sharp fa-solid fa-location-dot" />{" "}
                              Delhi, India
                            </div>
                            <div className="inl-wishlist">
                              <a href="#">
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
    </>
  );
};

export default Influencerinfluencers;
