import React, {useEffect, useState} from "react";
import InfluencerSidebar from "../component/InfluencerSidebar";
import Influencerheader from "../component/Influencerheader";
import { baseURL } from "../hooks/config";

const InfluencerDiscoverCampaign = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [allCamp, setAllCamp] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [filters, setFilters] = useState({
    socialMedia: "",
    startDate: "",
    endDate: "",
    campaignTypes: [],
  });
  const [showFilters, setShowFilters] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token.idToken}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `${baseURL}/influencer`,
          requestOptions
        );
        const result = await response.json();
        setResponseData(result);

        if (result && result.niches) {
          const niches = result.niches;
          const postHeaders = new Headers();
          postHeaders.append("Content-Type", "application/json");
          postHeaders.append("Authorization", `Bearer ${token.idToken}`);

          const postRequestOptions = {
            method: "POST",
            headers: postHeaders,
            body: JSON.stringify({genres: niches}),
            redirect: "follow",
          };

          const postResponse = await fetch(
            `${baseURL}/campaigns/restrict`,
            postRequestOptions
          );
          const postResult = await postResponse.json();
          setAllCamp(postResult);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [token.idToken]);

  // Filter function to apply filters
  const applyFilters = camp => {
    const {socialMedia, startDate, endDate} = filters;
    return (
      (!socialMedia || camp.socialMedia === socialMedia) &&
      (!startDate || new Date(camp.startDate) >= new Date(startDate)) &&
      (!endDate || new Date(camp.endDate) <= new Date(endDate))
    );
  };

  const formatDate = dateString => {
    const options = {year: "numeric", month: "short", day: "2-digit"};
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <InfluencerSidebar />
      <Influencerheader />
      <div className="main-panel">
        <div className="content">
          <div className="page-header mt10">
            <h1 className="page-title">Our Campaigns</h1>

            <div className="expor-data ml-auto">
              <button
                class=" btn border border-secondary p-2 rounded"
                onClick={() => setShowFilters(true)}
              >
                <img
                  src="assets/images/filter-audience-icon.svg"
                  alt=""
                  width={"30px"}
                  class="img-fluid"
                />
              </button>
            </div>
          </div>
          <div className="page-inner">
            <div className="content-wrapper">
              <div className="dasboard-table content_FLX_mdl mt10">
                {/* Campaigns Table */}
                <div className="table-responsive">
                  <table
                    id="example3"
                    className="table table-striped table-bordered dt-responsive nowrap"
                    style={{width: "100%"}}
                  >
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Campaigns Name</th>
                        <th>Brand Name</th>
                        <th>Genre</th>
                        <th>Social Media</th>
                        <th width="100">Campaigns</th>
                        <th>Country</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCamp
                        ? allCamp.filter(applyFilters).map(camp => (
                            <tr key={camp.id}>
                              <td>
                                <img
                                  src={camp.campaignPic?.pathUri}
                                  alt="campaign"
                                  width={60}
                                />
                              </td>
                              <td>{camp.campaignName}</td>
                              <td>{camp.brandName}</td>
                              <td>
                                {camp.genres?.map(gen => (
                                  <span key={gen}>{gen}, </span>
                                ))}
                              </td>
                              <td>{camp.socialMedia}</td>
                              <td>
                                <span className="text-success">
                                  {camp.campaignTypes?.map(gen => (
                                    <span key={gen}>{gen}, </span>
                                  ))}
                                </span>
                              </td>
                              <td>{camp.country}</td>
                              <td>{formatDate(camp.startDate)}</td>
                              <td>{formatDate(camp.endDate)}</td>
                            </tr>
                          ))
                        : ""}
                    </tbody>
                  </table>
                </div>

                {/* End of Campaigns Table */}
              </div>
            </div>
            <div className="copyright_text">
              © 2023, Sociopuff. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap Modal for Filters */}
      {showFilters && (
        <div className="modal fade show" style={{display: "block"}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filters</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowFilters(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Filter Section */}

                <div className="filter-section row">
                  <div className="form-group col-md-4">
                    <label htmlFor="socialMedia">Social Media:</label>
                    <select
                      id="socialMedia"
                      value={filters.socialMedia}
                      onChange={e =>
                        setFilters({
                          ...filters,
                          socialMedia: e.target.value,
                        })
                      }
                      className="form-control"
                    >
                      <option value="">All</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Facebook">Facebook</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      id="startDate"
                      value={filters.startDate}
                      onChange={e =>
                        setFilters({...filters, startDate: e.target.value})
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      id="endDate"
                      value={filters.endDate}
                      onChange={e =>
                        setFilters({...filters, endDate: e.target.value})
                      }
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {/* End of Filter Section */}
            </div>
          </div>
        </div>
      )}
      {/* End of Bootstrap Modal for Filters */}
    </div>
  );
};

export default InfluencerDiscoverCampaign;
