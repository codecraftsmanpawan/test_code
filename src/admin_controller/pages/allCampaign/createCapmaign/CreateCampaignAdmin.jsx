import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import AdminHeader from "../../../components/AdminHeader";
import AdminSidebar from "../../../components/AdminSidebar";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import { parseJwt } from "../../../../utils/common";
const CreateCampaignAdmin = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const data = parseJwt(token);
  const [selectedCampaignTypes, setSelectedCampaignTypes] = useState([
    "Affiliated",
  ]);
  const [selectedGenres, setSelectedGenres] = useState(["Health & Fitness"]);
  const [campaignPic, setCampaignPic] = useState({
    name: "",
    type: "",
    pathUri: "",
  });
  const [campaignFiles, setCampaignFiles] = useState([]);

  const handleCampaignTypeClick = campaignType => {
    setSelectedCampaignTypes(prevSelected => {
      if (prevSelected.includes(campaignType)) {
        return prevSelected.filter(type => type !== campaignType);
      } else {
        return [...prevSelected, campaignType];
      }
    });
  };

  const handleGenreClick = genre => {
    setSelectedGenres(prevSelected => {
      if (prevSelected.includes(genre)) {
        return prevSelected.filter(selectedGenre => selectedGenre !== genre);
      } else {
        return [...prevSelected, genre];
      }
    });
  };

  const handleFile1Change = async e => {
    const file = e.target.files[0];
    setFile1(file);
    const base64String = await convertToBase64(file);
    setCampaignPic({
      name: file.name,
      type: file.type,
      pathUri: base64String,
    });
  };

  const handleFile2Change = async e => {
    const file = e.target.files[0];
    setFile2(file);
    const base64String = await convertToBase64(file);
    setCampaignFiles([
      {
        name: file.name,
        type: file.type,
        pathUri: base64String,
      },
    ]);
  };

  const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCreateCampaign = async () => {
    if (
      !campaignName ||
      !brandName ||
      !brandDetails ||
      !productDetails ||
      !creationGuideline ||
      !contentDescription ||
      !contentTags ||
      !country ||
      !budgetUpTo ||
      !minimumCreatorSize ||
      !startDate ||
      !endDate ||
      !gender ||
      !age ||
      !location ||
      !audienceDetails ||
      !socialMedia ||
      selectedCampaignTypes.length === 0 ||
      selectedGenres.length === 0
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Set campaignPic and campaignFiles before sending the request
    setCampaignPic(campaignPic);
    setCampaignFiles(campaignFiles);

    try {
      const raw = JSON.stringify({
        campaignName,
        brandName,
        brandDetails,
        productDetails,
        contentCreationGuideline: creationGuideline,
        contentDescription,
        contentTags: contentTags.split(",").map(tag => tag.trim()),
        campaignPic,
        campaignFiles,
        country,
        budgetUpTo,
        minimumCreatorSize,
        startDate,
        endDate,
        gender,
        age,
        location,
        audienceDetails,
        campaignTypes: selectedCampaignTypes,
        genres: selectedGenres,
        status: true,
        socialMedia: socialMedia,
      });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization",`Bearer ${token}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const apiUrl = "http://localhost:9090/campaign";

      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success("Campaign created successfully");

      window.location.href = "/allcampaignadmin";
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while creating the campaign");
    }
  };

  const [campaignName, setCampaignName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandDetails, setBrandDetails] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [creationGuideline, setCreationGuideline] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [contentTags, setContentTags] = useState("");
  const [country, setCountry] = useState("");
  const [budgetUpTo, setBudgetUpTo] = useState();
  const [minimumCreatorSize, setMinimumCreatorSize] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [audienceDetails, setAudienceDetails] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleCampaignNameChange = e => {
    setCampaignName(e.target.value);
  };

  const handleBrandNameChange = e => {
    setBrandName(e.target.value);
  };

  const handleBrandDetailsChange = e => {
    setBrandDetails(e.target.value);
  };

  const handleProductDetailsChange = e => {
    setProductDetails(e.target.value);
  };
  const handleCreationGuidelineChange = e => {
    setCreationGuideline(e.target.value);
  };

  const handleContentDescriptionChange = e => {
    setContentDescription(e.target.value);
  };

  const handleContentTagsChange = e => {
    setContentTags(e.target.value);
  };
  const handleCountryChange = e => {
    setCountry(e.target.value);
  };

  const handleBudgetUpToChange = e => {
    setBudgetUpTo(Number(e.target.value));
  };

  const handleMinimumCreatorSizeChange = e => {
    setMinimumCreatorSize(Number(e.target.value));
  };

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  const handleAgeChange = e => {
    setAge(e.target.value);
  };
  const handleLocationChange = e => {
    setLocation(e.target.value);
  };

  const handleAudienceDetailsChange = e => {
    setAudienceDetails(e.target.value);
  };
  const handleSocialMediaChange = e => {
    setSocialMedia(e.target.value);
  };

  return (
    <div className="wrapper">
      <AdminHeader />
      <AdminSidebar />
      <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <a className="btn-sm btn-light mr-2" href="your-campaigns.html">
                <i className="fa fa-arrow-left-long" /> Back
              </a>
              <h1 className="page-title">Create Campaign</h1>
            </div>
            <div className="page-inner">
              <div className="content-wrapper">
                <div className="card">
                  <div className="card-body">
                    <div className="form-row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="Region">Campaign/Product Name</label>
                        <input
                          type="text"
                          name="product_name"
                          id="product_Name"
                          className="form-control"
                          placeholder="SocioPuff"
                          value={campaignName}
                          onChange={handleCampaignNameChange}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="Region">Brand Name</label>
                        <input
                          type="text"
                          name="brand_name"
                          id="brand_name"
                          className="form-control"
                          placeholder="Candddy"
                          value={brandName}
                          onChange={handleBrandNameChange}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="Region">Brand Details</label>
                        <textarea
                          type="text"
                          name="brand_details"
                          id="brand_details"
                          className="form-control"
                          value={brandDetails}
                          onChange={handleBrandDetailsChange}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="Region">Campaign/Product Details</label>
                        <textarea
                          type="text"
                          name="product_details"
                          id="product_details"
                          className="form-control"
                          value={productDetails}
                          onChange={handleProductDetailsChange}
                        />
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="Region">
                          Content Creation Guideline
                        </label>
                        <textarea
                          type="text"
                          name="creation_guideline"
                          id="creation_guideline"
                          className="form-control"
                          value={creationGuideline}
                          onChange={handleCreationGuidelineChange}
                        />
                        <div className="info-lbl">
                          Token for Coupon Code is: code@
                          <span className="pull-right">
                            Token for Tracking Like Information is: url@
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="Region">Content Description</label>
                        <textarea
                          type="text"
                          name="content_description"
                          id="content_description"
                          className="form-control"
                          value={contentDescription}
                          onChange={handleContentDescriptionChange}
                        />
                        <div className="info-lbl">
                          Token for Coupon Code is: code@
                          <span className="pull-right">
                            Token for Tracking Like Information is: url@
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-sm-12">
                        <label htmlFor="Region">Content Tags</label>
                        <textarea
                          type="text"
                          name="content_tags"
                          id="content_tags"
                          className="form-control"
                          value={contentTags}
                          onChange={handleContentTagsChange}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="file1">Product Image/video</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="file1"
                            id="file1"
                            className="custom-file-input"
                            onChange={handleFile1Change}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="file1"
                          ></label>
                        </div>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="file2">
                          Upload PDF/Excel (Optional)
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="file2"
                            id="file2"
                            className="custom-file-input"
                            onChange={handleFile2Change}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="file2"
                          ></label>
                        </div>
                      </div>

                      <div className="form-group col-sm-4">
                        <label htmlFor="Region">Country</label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          className="form-control"
                          value={country}
                          onChange={handleCountryChange}
                        />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">Budget Upto</label>
                        <input
                          type="text"
                          name="budgetUpTo"
                          id="budgetUpTo"
                          className="form-control"
                          value={budgetUpTo}
                          onChange={handleBudgetUpToChange}
                        />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">Minimum Creator size</label>
                        <input
                          type="text"
                          name="minimumCreatorSize"
                          id="minimumCreatorSize"
                          className="form-control"
                          value={minimumCreatorSize}
                          onChange={handleMinimumCreatorSizeChange}
                        />
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">Start Date</label>
                        <div className="datepic">
                          <input
                            type="date"
                            id="datepicker"
                            name="startDate"
                            className="form-control"
                            placeholder="dd/mm/yyyy"
                            value={startDate}
                            onChange={handleStartDateChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-3">
                        <label htmlFor="Region">End Date</label>
                        <div className="datepic">
                          <input
                            type="date"
                            id="datepicker1"
                            name="endDate"
                            className="form-control"
                            placeholder="dd/mm/yyyy"
                            value={endDate}
                            onChange={handleEndDateChange}
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-12 mt20">
                        <h2 className="card-title">Targeting</h2>
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="Gender">Gender</label>
                        <select
                          id="gender"
                          name="gender"
                          className="custom-select"
                          value={gender}
                          onChange={handleGenderChange}
                        >
                          <option selected>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="Age">Age Group</label>
                        <select
                          id="age"
                          name="age"
                          className="custom-select"
                          value={age}
                          onChange={handleAgeChange}
                        >
                          <option selected>Select Age</option>
                          <option value="18-35">18-35</option>
                          <option value="36-50">36-50</option>
                          <option value="51-65">51-65</option>
                          <option value="66+">66 and above</option>
                        </select>
                      </div>

                      <div className="form-group col-sm-4">
                        <label htmlFor="Region">Location</label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          className="form-control"
                          value={location}
                          onChange={handleLocationChange}
                        />
                      </div>
                      <div className="form-group col-sm-12">
                        <label htmlFor="Region">Audience Detail</label>
                        <textarea
                          type="text"
                          name="audienceDetails"
                          id="audienceDetails"
                          className="form-control"
                          value={audienceDetails}
                          onChange={handleAudienceDetailsChange}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="SocialMedia">Social Media</label>
                        <select
                          className="custom-select"
                          name="social_media"
                          value={socialMedia}
                          onChange={handleSocialMediaChange}
                        >
                          <option value="" defaultValue>
                            Select Social Media
                          </option>
                          <option value="Facebook">Facebook</option>
                          <option value="Youtube">Youtube</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Twitter">Twitter</option>
                        </select>
                      </div>

                      <div className="form-group col-sm-12 mt20">
                        <h2 className="card-title">Campaign Type</h2>
                      </div>
                      <div className="form-group col-sm-12">
                        <Link
                          className={`slct_link ${
                            selectedCampaignTypes.includes("Barter")
                              ? "selected"
                              : ""
                          }`}
                          href="#"
                          onClick={() => handleCampaignTypeClick("Barter")}
                        >
                          Barter
                        </Link>
                        <Link
                          className={`slct_link ${
                            selectedCampaignTypes.includes("Affiliated")
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleCampaignTypeClick("Affiliated")}
                        >
                          Affiliated
                        </Link>
                        <Link
                          className={`slct_link ${
                            selectedCampaignTypes.includes("Paid")
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleCampaignTypeClick("Paid")}
                        >
                          Paid
                        </Link>
                      </div>
                      <div className="form-group col-sm-12 mt20">
                        <h2 className="card-title">Genre</h2>
                      </div>
                      <div className="form-group col-sm-12">
                        {[
                          "Fashion",
                          "Health & Fitness",
                          "Beauty",
                          "Mom-baby",
                          "Travel",
                          "Food & Drink",
                          "Model",
                          "Lifestyle",
                          "Automobile Car Bikes",
                          "Technology",
                          "Entertainment",
                          "Electronics Gadgets",
                          "Home Decor",
                        ].map(genre => (
                          <Link
                            key={genre}
                            className={`slct_link ${
                              selectedGenres.includes(genre) ? "selected" : ""
                            }`}
                            href="#"
                            onClick={() => handleGenreClick(genre)}
                          >
                            {genre}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <button
                        className="btn2 btn"
                        onClick={handleCreateCampaign}
                      >
                        Create Campaign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CreateCampaignAdmin;
