import React, {useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar";
import {toast} from "react-toastify";
import { baseURL } from "../../../../hooks/config";

const CreateInfluencers = () => {
  const token = JSON.parse(localStorage.getItem("idToken"));
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [influencerInfo, setInfluencerInfo] = useState({
    influencerName: "",
    email: "",
    instagram: "",
    youtube: "",
    twitter: "",
    tiktok: "",
    facebook: "",
    gender: "",
    followerRange: 0
  });
  const [profilePic, setProfilePic] = useState({ file: null, name: "", type: "", base64: "", preview: "" });
  const [additionalPics, setAdditionalPics] = useState(Array(5).fill({ file: null, name: "", type: "", base64: "", preview: "" }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfluencerInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        const preview = URL.createObjectURL(file);
        setProfilePic({
          file: file,
          name: file.name,
          type: file.type,
          base64: base64,
          preview: preview
        });
      } catch (error) {
        console.error('Error converting profile pic to base64:', error);
      }
    }
  };

  const handleAdditionalPicsChange = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        const preview = URL.createObjectURL(file);
        const newAdditionalPics = [...additionalPics];
        newAdditionalPics[index] = {
          file: file,
          name: file.name,
          type: file.type,
          base64: base64,
          preview: preview
        };
        setAdditionalPics(newAdditionalPics);
      } catch (error) {
        console.error('Error converting additional pics to base64:', error);
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read the file.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleClick = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestData = {
      "influencerName": influencerInfo.influencerName,
      "email": influencerInfo.email,
      "instagram": influencerInfo.instagram,
      "youtube": influencerInfo.youtube,
      "twitter": influencerInfo.twitter,
      "tiktok": influencerInfo.tiktok,
      "facebook": influencerInfo.facebook,
      "gender": influencerInfo.gender,
      "followerRange": influencerInfo.followerRange,
      "influencerPic": {
        "name": profilePic.name,
        "type": profilePic.type,
        "pathUri": profilePic.base64
      },
      "influencerFiles": additionalPics.map(pic => ({
        "name": pic.name,
        "type": pic.type,
        "pathUri": pic.base64
      })),
      "campaignType": selectedCampaignTypes,
      "niches": selectedCategories,
      "packages": packages.map(packageItem => ({
        platform: packageItem.platform,
        packageOffering: packageItem.packageOffering,
        price: packageItem.price,
        describeYourselfPackage: packageItem.describeYourself,
      })),
    };
    console.log(requestData)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(requestData),
      redirect: "follow"
    };

    fetch(`${baseURL}/influencer`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Request failed with status: ' + response.status);
        }
        return response.json();
      })
      .then(result => {
        setApiResponse(result);
        setError(null);
        toast.success("Account Created successfully!");
        navigate('/allinfluenceradmin');
      })
      .catch(error => {
        console.error(error);
        setError('Error sending request: ' + error.message);
        setApiResponse(null);
        toast.error("Error sending request: " + error.message);
      });
  };

  const categories = [
    "Lifestyle", "Fashion", "Beauty", "Travel", "Health Fitness", "Food Drink",
    "Model", "Comedy Entertainment", "Art Photography", "Music Dance", "Entr Business",
    "Family Children", "Animals Pets", "Athlete Sports", "Adventure Outdoors", "Education",
    "Celebritypf", "Gaming", "Actor", "Technology", "LGBTQ2", "Healthcare",
    "Vegan", "Cannabis", "Skilled Trades", "Automotive"
  ];

  const campaignTypes = ["BARTER", "AFFILIATE", "PAID"];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCampaignTypes, setSelectedCampaignTypes] = useState([]);

  const handleCategoryClick = category => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  const handleCampaignTypeClick = campaignType => {
    const updatedCampaignTypes = selectedCampaignTypes.includes(campaignType)
      ? selectedCampaignTypes.filter(type => type !== campaignType)
      : [...selectedCampaignTypes, campaignType];

    setSelectedCampaignTypes(updatedCampaignTypes);
  };
  const [packages, setPackages] = useState([
    {
      platform: "Select Platform",
      packageOffering: "--Select--",
      price: "",
      describeYourself: "",
    },
  ]);

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        platform: "Select Platform",
        packageOffering: "--Select--",
        price: "",
        describeYourself: "",
      },
    ]);
  };

  const removePackage = index => {
    const updatedPackages = [...packages];
    updatedPackages.splice(index, 1);
    setPackages(updatedPackages);
  };
  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="main-panel clr2 ">
        <div className="page-inner influencers_sect">
          <div className="content-wrapper" style={{marginTop: "90px"}}>
            
              <h1 className="page-title mt-4">Create Influencer</h1>
              <div className="card mt-3">
                  <div className="card-body">
                    <h2 className="card-title font-weight-bold">Connect your social media</h2>
                    <div className="social-media-sect">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" htmlFor="checkbox" className="custom-control-input" id="Youtube" name="checkbox" />
                        <label className="custom-control-label ytb" htmlFor="checkbox">
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-youtube fa-fw" /> Youtube
                          </a>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="Instagram" name="checkbox" />
                        <label className="custom-control-label instagram" htmlFor="checkbox">
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-instagram fa-fw" /> Instagram
                          </a>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="Facebook" name="checkbox" />
                        <label className="custom-control-label facbk" htmlFor="checkbox">
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-facebook fa-fw" /> Facebook
                          </a>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox disabled">
                        <input type="checkbox" className="custom-control-input" disabled id="Twitter" name="checkbox" />
                        <label className="custom-control-label twtr" htmlFor="checkbox">
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-twitter fa-fw" /> Twitter
                          </a>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox disabled">
                        <input type="checkbox" className="custom-control-input" disabled id="Linkedin" name="checkbox" />
                        <label className="custom-control-label facbk" htmlFor="checkbox">
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-linkedin-in fa-fw" /> Linkedin
                          </a>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox disabled">
                        <input type="checkbox" className="custom-control-input" disabled id="TikTok" name="checkbox" />
                        <label className="custom-control-label tiktok" htmlFor="checkbox">
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-tiktok fa-fw" /> TikTok
                          </a>
                        </label>
                      </div>
                      <div className="custom-control custom-checkbox disabled">
                        <input type="checkbox" className="custom-control-input" disabled id="Twitch" name="Twitch" />
                        <label className="custom-control-label twitch" htmlFor>
                          <a href="#" data-target="#Connect-channels" data-toggle="modal">
                            <i className="fa-brands fa-twitch fa-fw" /> Twitch
                          </a>
                        </label>
                      </div>
                    </div>
                    <h2 className="card-title font-weight-bold">Personal Detail</h2>
                    <div className="form-row mt-4">
                      <div className="form-group col-sm-3">
                        <label htmlFor="name_ys">Full Name</label>
                        <input type="text" name="influencerName" placeholder="Pawan Kumar Singh" className="form-control" value={influencerInfo.influencerName} onChange={handleChange} />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">Email</label>
                        <input type="email" name="email" placeholder="pawaniimtu@gmail.com" className="form-control" value={influencerInfo.email} onChange={handleChange}  />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">Summarize Profile Title</label>
                        <input type="text" name="gender" value={influencerInfo.gender} onChange={handleChange} className="form-control" placeholder="E.g. Fitness Content Creator & Student Athlete" />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">Followers</label>
                        <input type="number" name="followerRange" placeholder="Followers" className="form-control" value={influencerInfo.followerRange} onChange={handleChange} />
                      </div>
                      <div className="form-group col-sm-12">
                        <label htmlFor="Region">Describe Yourself</label>
                        <textarea type="text" name="tiktok" value={influencerInfo.tiktok} onChange={handleChange} className="form-control" placeholder="Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches." defaultValue={""} />
                        <div className="info-lbl">Maximum word limit 20</div>
                      </div>
                    </div>

                    <h2 className="card-title font-weight-bold">
                      Social Media URL
                    </h2>
                    <div className="form-row mt-4">
                      <div className="form-group col-sm-3">
                        <label htmlFor="Youtube">
                          <i className="fab fa-youtube fa-fw"></i> Youtube Link
                        </label>
                        <input type="text" name="youtube" className="form-control" placeholder="https://www.youtube.com/hashtag/youtubelink" value={influencerInfo.youtube} onChange={handleChange} />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Instagram">
                          {" "}
                          <i className="fab fa-instagram fa-fw"></i> Instagram
                          Link
                        </label>
                        <input type="text" name="instagram" className="form-control" placeholder="https://www.instagram.com/accounts/login/?hl=en" value={influencerInfo.instagram} onChange={handleChange} />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="facebook">
                          {" "}
                          <i className="fa-brands fa-facebook fa-fw" /> Facebook
                        </label>
                        <input type="text" name="facebook" className="form-control" placeholder="https://www.facebook.com" value={influencerInfo.facebook} onChange={handleChange} />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Twitter">
                          {" "}
                          <i className="fa-brands fa-twitter fa-fw" /> Twitter
                        </label>
                        <input type="text" name="twitter" className="form-control" placeholder="https://twitter.com/i/flow/login" value={influencerInfo.twitter} onChange={handleChange} />
                      </div>
                    </div>
                    <h2 className="card-title font-weight-bold mt-2">
                      Select the niches that match your content
                    </h2>
                    <div className="form-group mt20" id="match_content">
                      {categories.map((category, index) => (
                        <a style={{ cursor: "pointer" }}
                          key={index}
                          className={`slct_link ${selectedCategories.includes(category) ? "selected" : ""}`}
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category}
                        </a>
                      ))}
                    </div>

                    <h2 className="card-title font-weight-bold mt-2">
                      Select your campaign type
                    </h2>
                    <div className="form-group mt20" id="campaign_type">
                      {campaignTypes.map((campaignType, index) => (
                        <a style={{ cursor: "pointer" }}
                          key={index}
                          className={`slct_link ${selectedCampaignTypes.includes(campaignType) ? "selected" : ""}`}
                          onClick={() => handleCampaignTypeClick(campaignType)}
                        >
                          {campaignType}
                        </a>
                      ))}
                    </div>
                    <h2 className="card-title font-weight-bold mt-2">Add images of you and your content</h2>
                    <div className="inl-det-img-sect mt20">
                      <div className="image-sm-sect">
                        <div className="image1">
                          {[0].map((index) => (
                            <div key={index}>
                              <div className="add-file">
                                <div className="custom-file">
                                  <input type="file" accept="image/*" className="custom-file-input" onChange={(event) => handleAdditionalPicsChange(event, index)} />
                                </div>
                                <i className="fa-solid fa-plus fa-fw" />
                              </div>
                              {additionalPics[index].preview && (
                                <img
                                  src={additionalPics[index].preview}
                                  alt={`Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}
                              {!additionalPics[index].preview && (
                                <img
                                  src="assets/images/demo-img-sm.jpg"
                                  alt={`Default Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}

                            </div>
                          ))}
                        </div>

                        <div className="image2">
                          {[1].map((index) => (
                            <div key={index}>
                              <div className="add-file">
                                <div className="custom-file">
                                  <input type="file" accept="image/*" className="custom-file-input" onChange={(event) => handleAdditionalPicsChange(event, index)} />
                                </div>
                                <i className="fa-solid fa-plus fa-fw" />
                              </div>
                              {additionalPics[index].preview && (
                                <img
                                  src={additionalPics[index].preview}
                                  alt={`Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}
                              {!additionalPics[index].preview && (
                                <img
                                  src="assets/images/demo-img-sm.jpg"
                                  alt={`Default Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}

                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="image-md-sect">
                        <div className="profil-img">
                          <div className="add-file">
                            <div className="custom-file">
                              <input type="file" className="custom-file-input" accept="image/*" onChange={handleProfilePicChange} />
                            </div>
                            <i className="fa-solid fa-plus fa-fw" />
                          </div>
                          {profilePic.preview && (
                            <img
                              src={profilePic.preview}
                              alt="Profile Pic"
                              width="150px"
                              height="125px"
                              style={{ borderRadius: '45%' }}
                              className="image-preview2"
                            />
                          )}
                          {!profilePic.preview && (
                            <img
                              src="assets/images/demo-img-sm.jpg"
                              alt="Default Profile Pic"
                              width="150px"
                              height="125px"
                              style={{ borderRadius: '45%' }}
                              className="image-preview2"
                            />
                          )}


                        </div>


                        <div className="add-file">
                          {[4].map((index) => (
                            <div key={index}>
                              <div className="custom-file">
                                <input type="file" accept="image/*" className="custom-file-input" onChange={(event) => handleAdditionalPicsChange(event, index)} />
                              </div>
                              <i className="fa-solid fa-plus fa-fw" />
                            </div>
                          ))}
                        </div>
                        {[4].map((index) => (
                          <div key={index} style={{ width: "800px", height: "400px" }}>
                            {additionalPics[index].preview && (
                              <img
                                src={additionalPics[index].preview}
                                alt={`Additional Pic ${index}`}
                                width="800px"
                                height="400px"

                              />
                            )}
                            {!additionalPics[index].preview && (
                              <img
                                src="assets/images/demo-img-sm.jpg"
                                alt={`Default Additional Pic ${index}`}
                                width="800px"
                                height="400px"

                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="image-sm-sect">
                        <div className="image3">
                          {[2].map((index) => (
                            <div key={index}>
                              <div className="add-file">
                                <div className="custom-file">
                                  <input type="file" accept="image/*" className="custom-file-input" onChange={(event) => handleAdditionalPicsChange(event, index)} />
                                </div>
                                <i className="fa-solid fa-plus fa-fw" />
                              </div>
                              {additionalPics[index].preview && (
                                <img
                                  src={additionalPics[index].preview}
                                  alt={`Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}
                              {!additionalPics[index].preview && (
                                <img
                                  src="assets/images/demo-img-sm.jpg"
                                  alt={`Default Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}

                            </div>
                          ))}
                        </div>
                        <div className="image4">
                          {[3].map((index) => (
                            <div key={index}>
                              <div className="add-file">
                                <div className="custom-file">
                                  <input type="file" accept="image/*" className="custom-file-input" onChange={(event) => handleAdditionalPicsChange(event, index)} />
                                </div>
                                <i className="fa-solid fa-plus fa-fw" />
                              </div>
                              {additionalPics[index].preview && (
                                <img
                                  src={additionalPics[index].preview}
                                  alt={`Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}
                              {!additionalPics[index].preview && (
                                <img
                                  src="assets/images/demo-img-sm.jpg"
                                  alt={`Default Additional Pic ${index}`}
                                  width="250px"
                                  height="200px"
                                />
                              )}

                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                    <h2 className="card-title font-weight-bold mt-3">
                      Add your packages
                    </h2>
                    <p className="package-p">
                      These are services brands can purchase from you. This
                      can be anything from a shoutout on your social media to
                      original content creation. Unsure what to charge? Use
                      our rate calculator.
                    </p>
                    <div id="packageContainer mt-2">
                      <div className="packages_sect">
                        {packages.map((packageItem, index) => (
                          <div key={index}>
                            <h2 className="card-title">
                              Package {index + 1}
                            </h2>
                            <div className="form-row mt-4">
                              <div className="form-group col-sm-4">
                                <label htmlFor={`platform${index}`}>
                                  Choose Platform
                                </label>
                                <select
                                  value={packageItem.platform}
                                  onChange={e =>
                                    handlePackageChange(
                                      index,
                                      "platform",
                                      e.target.value
                                    )
                                  }
                                  className="custom-select"
                                >
                                  <option>Select Platform</option>
                                  <option>YouTube</option>
                                  <option>Instagram</option>
                                  <option>Facebook</option>
                                  <option>TikTok</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label htmlFor={`package_offering${index}`}>
                                  What is this package offering?
                                </label>
                                <select
                                  value={packageItem.packageOffering}
                                  onChange={e =>
                                    handlePackageChange(
                                      index,
                                      "packageOffering",
                                      e.target.value
                                    )
                                  }
                                  className="custom-select"
                                >
                                  <option>--Select--</option>
                                  <option>example 1</option>
                                  <option>example 1</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-4">
                                <label htmlFor={`price${index}`}>
                                  Price
                                </label>
                                <input
                                  type="text"
                                  value={packageItem.price}
                                  onChange={e =>
                                    handlePackageChange(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  placeholder="Price $"
                                />
                                <div className="info-lbl">
                                  SOCIOPFF handling fee of 15% of the fee
                                </div>
                              </div>
                              <div className="form-group col-sm-12">
                                <label
                                  htmlFor={`describe_yourself${index}`}
                                >
                                  Describe Yourself package
                                </label>
                                <textarea
                                  value={packageItem.describeYourself}
                                  onChange={e =>
                                    handlePackageChange(
                                      index,
                                      "describeYourself",
                                      e.target.value
                                    )
                                  }
                                  className="form-control"
                                  placeholder="What is included in this package? How many posts or photos? What will the buyer be getting?"
                                />
                                <div className="info-lbl">
                                  Maximum word limit 20
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <button
                                type="button"
                                className="btn"
                                onClick={() => removePackage(index)}
                              >
                                Remove Package
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className="text-right mt-4">
                          <button
                            type="button"
                            onClick={addPackage}
                            className="btn"
                          >
                            Add Package
                          </button>
                        </div>


                      </div>
                    </div>
                    {apiResponse && <p>API Response: {apiResponse}</p>}
                    {error && <p>Error: {error}</p>}
                    <div className="mb-1 col-sm-12">
                      <button type="button" id="previewButton" data-target="#Previw-Influence" data-toggle="modal" className="btn2 mr-2 btn">Preview</button>
                      <button type="submit" disabled className="inflcrbtn btn">Submit</button>
                    </div>
                  </div>
                </div>
          
          </div>
          <div className="copyright_text">
            © 2023, Sociopuff. All Rights Reserved
          </div>
        </div>
      </div>
      {/* Previw influencer modal */}
      <div
        aria-labelledby="myModalLabel"
        className="modal fade show previw-influence"
        id="Previw-Influence"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title small-title">
                {influencerInfo.influencerName}
              </div>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
              >
                <span aria-hidden="true">
                  <i className="las la-times" />
                </span>
              </button>
            </div>
            <div className="modal-body influencers_sect">
              <div className="page-inner infl-detail">
                <div className="content-wrapper">
                  <div className="inl-det-img-sect">
                    <div className="image-sm-sect">
                      <div className="image1">

                        {[0].map((index) => (
                          <div key={index}>
                            {additionalPics[index].preview && (
                              <img
                                src={additionalPics[index].preview}
                                alt={`Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}
                            {!additionalPics[index].preview && (
                              <img
                                src="assets/images/demo-img-sm.jpg"
                                alt={`Default Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}

                          </div>
                        ))}

                      </div>
                      <div className="image2">
                        {[1].map((index) => (
                          <div key={index}>
                            {additionalPics[index].preview && (
                              <img
                                src={additionalPics[index].preview}
                                alt={`Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}
                            {!additionalPics[index].preview && (
                              <img
                                src="assets/images/demo-img-sm.jpg"
                                alt={`Default Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}

                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="image-md-sect" >
                      {[4].map((index) => (
                        <div key={index} style={{width:"800px", height:"400px"}}>
                          {additionalPics[index].preview && (
                            <img
                              src={additionalPics[index].preview}
                              alt={`Additional Pic ${index}`}
                              width="800px"
                              height="400px"
                            />
                          )}
                          {!additionalPics[index].preview && (
                            <img
                              src="assets/images/demo-img-sm.jpg"
                              alt={`Default Additional Pic ${index}`}
                              width="800px"
                              height="400px"
                            />
                          )}

                        </div>
                      ))}
                    </div>
                    <div className="image-sm-sect">
                      <div className="image3">
                        {[2].map((index) => (
                          <div key={index}>
                            {additionalPics[index].preview && (
                              <img
                                src={additionalPics[index].preview}
                                alt={`Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}
                            {!additionalPics[index].preview && (
                              <img
                                src="assets/images/demo-img-sm.jpg"
                                alt={`Default Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}

                          </div>
                        ))}
                      </div>
                      <div className="image4">
                        {[3].map((index) => (
                          <div key={index}>
                            {additionalPics[index].preview && (
                              <img
                                src={additionalPics[index].preview}
                                alt={`Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}
                            {!additionalPics[index].preview && (
                              <img
                                src="assets/images/demo-img-sm.jpg"
                                alt={`Default Additional Pic ${index}`}
                                width="250px"
                                height="200px"
                              />
                            )}

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="page-title">
                    {selectedCategories.join(", ")}
                  </h4>
                  <br />
                  <h5 className="page-description">
                    {influencerInfo.tiktok}
                  </h5>
                  <p className="mt15"></p>
                  <div className="form-row mt-5">
                    <div className="col-md-5">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-content-center">
                            <div className="profile-inf">
                              {profilePic.preview && (
                                <img
                                  src={profilePic.preview}
                                  alt="Profile Pic"
                                  className="image-preview2 avatar-img rounded-circle"
                                />
                              )}
                              {!profilePic.preview && (
                                <img
                                  src="assets/images/demo-img-sm.jpg"
                                  alt="Default Profile Pic"
                                  className="image-preview2 avatar-img rounded-circle"
                                />
                              )}

                            </div>
                            <div className="ml-3 w-71">
                              <h2 className="card-title" id="previewContent4" />
                              <div className="d-flex align-content-center">
                                <div className="mr-3">
                                  <p className="designation mt-2 mb-2">{influencerInfo.gender}</p>
                                  <div>Followers: {influencerInfo.followerRange}</div>
                                </div>
                                <div className="ml-auto">
                                  <div className="social_link mt-2">
                                    <a href={influencerInfo.instagram} target='_blank' className="ml-0"><img src="assets/images/inf-instagram.svg" alt="" /></a>
                                    <a href={influencerInfo.youtube} target='_blank'><img src="assets/images/inf-youtube.svg" alt="" /></a>
                                    <a href={influencerInfo.facebook} target='_blank'><img src="assets/images/inf-facebook.svg" alt="" /></a>
                                    <a href={influencerInfo.twitter} target='_blank'><img src="assets/images/inf-twitter.svg" alt="" /></a>
                                  </div>
                                  <div className="inl-location mt-2"><i className="fa-sharp fa-solid fa-location-dot" /> Delhi, India</div>
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
                              <p className="fw-600">
                              {selectedCampaignTypes.join(", ")}
                              </p>
                              <div className="sort-price">
                                $200
                              </div>
                              <div className="small">
                                SOCIOPFF handling fee of 15%
                                of the fee
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <select className="custom-select">
                                  <option selected>
                                    Story Post
                                  </option>
                                  <option>Example 1</option>
                                  <option>Example 2</option>
                                  <option>Example 3</option>
                                </select>
                              </div>
                              <p className="fs12 m-0">
                                1-2 story posts, either photo
                                or video, with tags and
                                mentions. Can include swipe-up
                                links as well.
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
                        <option>Packages 1</option>
                        <option>Packages 2</option>
                        <option>Packages 3</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <i className="fa-solid fa-circle-info" />{" "}
                      How does it work?
                    </div>
                  </div>
                  <div className="form-row mt-4">
                    {packages.map((packageItem, index) => (
                      <div
                        key={index}
                        className="col-md-4 mb-3"
                      >
                        <div className="card inl-prices">
                          <div className="card-body">
                            <div className="top">
                              <div>
                                <div className="social-title">
                                  {packageItem.platform}
                                </div>
                                <div className="price">
                                  {
                                    packageItem.packageOffering
                                  }
                                </div>
                              </div>
                              <div className="price">
                                ${packageItem.price}
                              </div>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  className="custom-control-input"
                                  id={`radio${index}`}
                                  name="example"
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`radio${index}`}
                                />
                              </div>
                            </div>
                            <p>
                              {packageItem.describeYourself}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <Link
                      className="btn inflcrbtn mr-1"
                      onClick={handleClick} 
                      type="submit"
                    >
                      Submit
                    </Link>
                    <Link
                      className="btn btn-secondary"
                      aria-label="Close"
                      data-dismiss="modal"
                      type="submit"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInfluencers;
