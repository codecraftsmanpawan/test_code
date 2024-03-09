import {Link, NavLink} from "react-router-dom";
import Header from "../component/Header";
import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import FilterSection from "../component/FilterSection";
import {useType} from "../hooks/type-context";
import useDocumentTitle from "../pureFunctions/useDocumentTitle";
import NotificationPost from "../GetDataFunctions/NotificationPost";
import {ChannelFuntion} from "../GetDataFunctions/FilterFunction";
import {NicheFilter} from "../GetDataFunctions/NicheFilter";
import Sidebar from "../component/Sidebar";
import { baseURL } from "../hooks/config";

const Influencers = () => {
  useDocumentTitle("influencer");
  const token = JSON.parse(localStorage.getItem("token"));
  const [imageData, setImageData] = useState({});
  const {typeState} = useType();
  const [wishlist, setWishlist] = useState([]);
  const {allInfluencers, channel, niches} = typeState;

  const {
    fashion,
    health_and_fittness,
    beauty,
    mob_baby,
    travel,
    food_and_drink,
    model,
    lifestyle,
    automobiles_car_and_bike,
    entertainment,
    technology,
    electronic_gadgets,
    home_decor,
    art_photography,
    music_dance,
    entr_business,
    family_children,
    animals_pets,
    athlete_sports,
    adventure_outdoors,
    education,
    celebritypf,
    gaming,
    actor,
    healthcare,
    vegan,
    cannabis,
    skilled_trades,
    automotive
  } = niches;
  const channelFilteredData = ChannelFuntion(
    allInfluencers,
    channel.youtube,
    channel.instagram,
    channel.facebook,
    channel.twitter
  );

  const nichesFilteredData = NicheFilter(
    channelFilteredData,
    fashion,
    health_and_fittness,
    beauty,
    mob_baby,
    travel,
    food_and_drink,
    model,
    lifestyle,
    automobiles_car_and_bike,
    entertainment,
    technology,
    electronic_gadgets,
    home_decor,
    art_photography,
    music_dance,
    entr_business,
    family_children,
    animals_pets,
    athlete_sports,
    adventure_outdoors,
    education,
    celebritypf,
    gaming,
    actor,
    healthcare,
    vegan,
    cannabis,
    skilled_trades,
    automotive
  );




  

  const handleClick = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token.idToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      for (const influencer of channelFilteredData) {
        if (
          influencer.influencerFiles &&
          influencer.influencerFiles.length > 0
        ) {
          const imageUrl = getFilePathUri(influencer.influencerFiles[0]);

          const response = await fetch(imageUrl, requestOptions);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result = await response.blob();
          const imageData = URL.createObjectURL(result);

          // Set the imageData in state for the current influencer
          setImageData(prevImageData => ({
            ...prevImageData,
            [influencer.id]: imageData,
          }));
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast("Error loading images");
    }
  };

  const getFilePathUri = file => {
    return `${file.pathUri}`;
  };

  useEffect(() => {
    handleClick();
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
          Authorization: `Bearer ${token.accessToken}`,
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
          const influencer = allInfluencers.find((item) => item.id === id);
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
            Authorization: `Bearer ${token.accessToken}`,
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
  }, [token.accessToken]);
  

  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="main-panel">
          <div className="content">
            <div className="infl-main">
              <FilterSection />
              <div className="inf-sect">
                <div className="page-header mt10 pl-0">
                  <h1 className="page-title">Influencers</h1>
                </div>
                <div className="page-inner p-0 influencers">
                  <div className="content-wrapper">
                    <div className="form-row">
                      {nichesFilteredData.map(influencer => (
                        <div className="col-md-4 col-sm-6" key={influencer.id}>
                          <div className="card" style={{minWidth: "290px"}}>
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
                                Followers: {influencer.followerRange}
                              </p>
                            </NavLink>
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
                              <div className="d-flex flex-column mb-3"></div>
                              <div className="inf-footer">
                                <div className="inl-location">
                                  <i className="fa-sharp fa-solid fa-location-dot"></i>{" "}
                                  {influencer.location} Delhi, India
                                </div>
                                <div className="inl-wishlist">
                                <a onClick={() => handleWishlist(influencer?.id)} style={{cursor:"pointer"}}>
                                  <i
                                    className="las la-heart"
                                    style={{
                                      color: wishlist.some((wishlistItem) => wishlistItem?.id === influencer?.id)
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
      </div>
    </>
  );
};

export default Influencers;
