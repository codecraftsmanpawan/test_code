import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Influencerheader from "../component/Influencerheader";
import InfluencerSidebar from "../component/InfluencerSidebar";
import { toast } from "react-toastify";
import { baseURL } from "../hooks/config";

const Influencermanagecampaigns = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [invites, setInvites] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);
  const [selectedInviteId, setSelectedInviteId] = useState(null);
  const [influencerId, setInfluencerId] = useState(null);
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [userId, setUserId] = useState(null);
  const [result, setResult] = useState(null);
  const [linkError, setLinkError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [influencerName, setInfluencerName] = useState('');
  const [brandID, setbrandId] = useState();
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetch(`${baseURL}/influencer`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
          redirect: "follow",
        });
        const result = await response.json();
        setInvites(result.influencerInvites);
        setInfluencerId(result.id);
        setUserId(result.userId);
        setResult(result);
        setInfluencerName(result.influencerName); 
        console.log(result);
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching influencer invites:", error);
      }
    };

    if (!dataFetched) {
      fetchInvites();
    }
  }, [dataFetched, token.idToken]);
 
  const fetchCampaignData = async (campaignId) => {
    try {
      const response = await fetch(
        `${baseURL}/campaign/restrict/${campaignId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
          redirect: "follow",
        }
      );
      const resultcam = await response.json();
      
      return resultcam; // Return campaign data
      
    } catch (error) {
      console.error(
        `Error fetching campaign data for campaign ID ${campaignId}:`,
        error
      );
      return null;
    }
  };


  useEffect(() => {
    if (!dataFetched) return; // Don't proceed if data isn't fetched yet

    const fetchInviteData = async () => {
      const inviteDataPromises = invites.map(async (invite) => {
        const campaignData = await fetchCampaignData(invite.campaignId);
        return { ...invite, campaignData };
      });

      const resolvedInviteData = await Promise.all(inviteDataPromises);
      setInvites(resolvedInviteData);
    };

    fetchInviteData();
  }, [dataFetched, invites, token.idToken]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-GB", options);
  };

  const handleCampaignSelect = (campaignId, inviteId, brandID) => {
    setSelectedCampaignId(campaignId);
    setSelectedInviteId(inviteId); 
    setbrandId(brandID);
    
  };

  const handleAction = async (
    inviteId,
    campaignId,
    influencerId,
    userId,
    campaignName,
    action
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/invite/action/${campaignId}/${influencerId}/${inviteId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.idToken}`,
          },
          redirect: "follow",
        }
      );

      const result = await response.text();
      console.log(result);

      if (response.ok) {
        toast.success(
          `Invite ${action === "true" ? "accepted" : "rejected"} successfully`
        );

        const notificationHeaders = new Headers();
        notificationHeaders.append("Content-Type", "application/json");
        notificationHeaders.append("Authorization", `Bearer ${token.idToken}`);

       

        const notificationBody = {
          textMessage: `${influencerName} ${action === "true" ? "Approved" : "Rejected"
            } your request for the campaign ${campaignName}`,
          status: "FAILED",
          receiverId: userId,
        };

        const notificationRequestOptions = {
          method: "POST",
          headers: notificationHeaders,
          body: JSON.stringify(notificationBody),
          redirect: "follow",
        };

        fetch(
          `${baseURL}/sendNotification`,
          notificationRequestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);

            window.location.reload();
          })
          .catch((error) => console.log("error", error));
      } else {
        toast.error("Error performing the action");
      }
    } catch (error) {
      console.error(`Error ${action} invite with ID ${inviteId}:`, error);
      toast.error(
        `Error ${action === "true" ? "accepting" : "rejecting"} invite`
      );
    }
  };

  const handleAccept = (
    inviteId,
    campaignId,
    influencerId,
    userId,
    campaignName,
    event
  ) => {
    event.preventDefault();
    handleAction(
      inviteId,
      campaignId,
      influencerId,
      userId,
      campaignName,
      "true"
    );
  };

  const handleReject = (
    inviteId,
    campaignId,
    influencerId,
    userId,
    campaignName,
    event
  ) => {
    event.preventDefault();
    handleAction(
      inviteId,
      campaignId,
      influencerId,
      userId,
      campaignName,
      "false"
    );
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSendClick = async () => {
    // Ensure the necessary data is available
    if (!selectedCampaignId || !selectedInviteId || !influencerId || !userId) {
      console.error("Missing required data for sending the message and link.");
      return;
    }
  
    // Validate message and link fields
    if (!message.trim() && !link.trim()) {
      setMessageError(true);
      setLinkError(true);
      toast.error("Please enter a message and a link.");
      return;
    } else if (!message.trim()) {
      setMessageError(true);
      toast.error("Please enter a message.");
      return;
    } else if (!link.trim()) {
      setLinkError(true);
      toast.error("Please enter a link.");
      return;
    }
  
    // If all checks pass, proceed with sending the message and link
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token.idToken}`);
  
    const raw = JSON.stringify({
      textMessage: message,
      link: link,
      isInfluencer : true,
    });
  
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        `${baseURL}/invite/post/${selectedCampaignId}/${influencerId}/${selectedInviteId}`,
        requestOptions
      );
      const result = await response.text();
  
      if (response.ok) {
        // Send notification
        const notificationBody = {
          textMessage: `Your post for the campaign ${selectedCampaignId} has been sent successfully.`,
          status: "FAILED",
          receiverId: brandID,
        };

        const notificationRequestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(notificationBody),
          redirect: "follow",
        };
  
        const notificationResponse = await fetch(
         ` ${baseURL}/sendNotification`,
          notificationRequestOptions
        );
        const notificationResult = await notificationResponse.text();
       
        toast.success("Post sent successfully");
        window.location.reload();
      } else {
        toast.error("Failed to send post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending post");
    }
  };
  
  // Function to check if a string is a valid URL
  const isValidURL = (url) => {
    // Regular expression to validate URL
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!urlPattern.test(url);
  };

  return (
    <div className="wrapper influencers_sect">
      <Influencerheader />
      <InfluencerSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-header mt10">
            <h1 className="page-title">Our Campaigns</h1>
            <div className="expor-data ml-auto"></div>
          </div>
          <div className="page-inner">
            <div className="content-wrapper">
              <div className="dasboard-table content_FLX_mdl mt10">
                <div className="table-responsive">
                  <table
                    id="example3"
                    className="table table-striped table-bordered dt-responsive nowrap"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Campaigns Name</th>
                        <th>Brand Name</th>
                        <th>Genre</th>
                        <th>Social Media</th>
                        <th>Campaigns</th>
                        <th>Country</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Campaigns Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invites.map((invite, index) => (
                        <tr key={invite.id}>
                          <td>
                            <img
                              src={
                                invite.campaignData?.campaignPic.pathUri ||
                                "assets/images/infl-product2.jpg"
                              }
                              style={{
                                maxWidth: "60px",
                                borderRadius: "10%",
                                maxHeight: "50px",
                              }}
                              alt=""
                            />
                          </td>
                          <td>
                            {invite.campaignData?.campaignName || "Loading..."}
                          </td>
                          <td>
                            {invite.campaignData?.brandName || "Loading..."}
                          </td>
                          <td>
                            {invite.campaignData?.genres.join(", ") ||
                              "Loading..."}
                          </td>
                          <td>
                            {invite.campaignData?.socialMedia || "Loading..."}
                          </td>
                          <td>
                            {invite.campaignData?.campaignTypes?.join(", ") ||
                              "Loading..."}
                          </td>
                          <td>
                            {invite.campaignData?.country || "Loading..."}
                          </td>
                          <td>
                            {formatDate(invite.campaignData?.startDate) ||
                              "Loading..."}
                          </td>
                          <td>
                            {formatDate(invite.campaignData?.endDate) ||
                              "Loading..."}
                          </td>
                          <td>
                            {invite?.postStatus === "SENT" ? (
                              <span className="text-warning">
                                <i>Post Pending</i>
                              </span>
                            ) : invite?.postStatus === "REJECT" ? (
                              <span className="text-danger">
                                <i>Modify post request</i>
                              </span>
                            ) : invite?.postStatus === "ACCEPTED" ? (
                              <span className="text-success">
                                <i>Post Accepted</i>
                              </span>
                            ) : invite?.inviteStatus === "SENT" ? (
                              <span className="text-warning">
                                <i>Campaign Invite</i>
                              </span>
                            ) : invite?.inviteStatus === "REJECT" ? (
                              <span className="text-danger">
                                <i>Campaign Rejected</i>
                              </span>
                            ) : invite?.inviteStatus === "ACCEPTED" ? (
                              <span className="text-success">
                                <i>Campaign Accepted</i>
                              </span>
                            ) : (
                              "Request" || "Loading..."
                            )}
                          </td>

                          <td className="action">
                            {invite.inviteStatus !== "REJECT" && (
                              <Link
                                href="#"
                                onClick={() =>
                                  handleCampaignSelect(invite.campaignId, invite.id,invite.campaignData.userId)
                                }
                                data-toggle="modal"
                                data-target="#exampleModalToggle"
                              >
                                <img src="assets/images/apply.svg" alt="" />
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="copyright_text">
              © 2023, Sociopuff. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedCampaignId &&
                  invites.map((invite) => {
                    if (invite.campaignId === selectedCampaignId) {
                      const campaignData = invite.campaignData;
                      const brandid = invite.campaignData.userId
                      
                      return (
                        <div key={invite.id} className="col-12">
                          <h4 className="card-title" style={{ fontSize: "25px;" }}><strong>Campain {campaignData?.campaignName || "Loading..."} of Brand  {campaignData?.brandName || "Loading..."} </strong></h4>
                          <p className="mt-2"><a href={invite.link} target="_blank">{invite.link}</a></p>

                        </div>
                      );
                    }
                    return null;
                  })}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              
              {selectedCampaignId &&
                invites.map((invite) => {
                  if (invite.campaignId === selectedCampaignId) {
                    const campaignData = invite.campaignData;
                    const brandid = invite.campaignData.userId
                    return (
                      <div key={invite.id} className="card">
                        <div className="row no-gutters">
                        
                          <div className="col-md-12">
                            <div className="card-body">

                              <div>
                                <div key={invite.id} className="profile-card">
                                  {invite.inviteStatus === "ACCEPTED" &&
                                    invite.postStatus === "ACCEPTED" && (
                                      <div>
                                       
                                        <p>Post Status: {invite.postStatus}</p>
                                        <a href={invite.link}>Go to Post</a>
                                      </div>
                                    )}
                                  {invite.inviteStatus === "SENT" &&
                                    invite.postStatus === "EMPTY" && (
                                      <div className="mt-3 pb-3">
                                        <button
                                          className="btn inflcrbtn mr-2"
                                          onClick={(e) =>
                                            handleAccept(
                                              invite.id,
                                              invite.campaignId,
                                              influencerId,
                                              invite.campaignData.userId,
                                              invite.campaignData.campaignName,
                                              e
                                            )
                                          }
                                        >
                                          Approve
                                        </button>
                                        
                                        <button
                                          className="btn btn-secondary"
                                          onClick={(e) =>
                                            handleReject(
                                              invite.id,
                                              invite.campaignId,
                                              influencerId,
                                              invite.campaignData.userId,
                                              invite.campaignData.campaignName,
                                              e
                                            )
                                          }
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    )}

                                  {invite.inviteStatus === "ACCEPTED" && (invite.postStatus === "EMPTY" || invite.postStatus === "REJECT") && (
                                    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', }}>
                                      <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                        {invite.influencerMessages.map((message, index) => (

                                          <div
                                            key={index}
                                            style={{
                                              Width: '100%',
                                              marginBottom: '10px',
                                              padding: '8px',
                                              borderRadius: '8px',
                                              alignSelf: message.isInfluencer === true ? 'flex-end' : 'flex-start',
                                              backgroundColor: message.isInfluencer === true ? '#DCF8C6' : '#E5E7E9'
                                            }}
                                          >
                                            <div className="mb-1">
                                              <span ><strong>{message.isInfluencer === true ? campaignData?.campaignName : "You"}</strong></span><br />

                                            </div>
                                            {message.isInfluencer === true ? (
                                              <img
                                                src={result.influencerPic.pathUri || "assets/images/default-profile-pic.jpg"}
                                                style={{
                                                  width: '30px',
                                                  height: '30px',
                                                  borderRadius: '50%',
                                                  marginRight: '10px',
                                                }}
                                                alt="Influencer"
                                              />
                                            ) : (
                                              <img
                                                src={invite.campaignData?.campaignPic.pathUri || "assets/images/infl-product2.jpg"}
                                                style={{
                                                  width: '30px',
                                                  height: '30px',
                                                  borderRadius: '50%',
                                                  marginRight: '10px',
                                                }}
                                                alt="Campaign"
                                              />
                                            )}

                                            {message.textMessage}
                                          </div>

                                        ))}

                                      </div>

                                      <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                          type="text"
                                          value={link}
                                          className={`form-control ${linkError ? 'is-invalid' : ''}`}
                                          onChange={handleLinkChange}
                                          onBlur={() => setLinkError(false)}
                                          style={{ flex: 1, marginRight: '10px' }}
                                          placeholder="Paste an image or video URL"
                                          required
                                        />
                                        {linkError && <div className="invalid-feedback">Please enter a valid URL.</div>}

                                        <input
                                          type="text"
                                          value={message}
                                          className={`form-control ${messageError ? 'is-invalid' : ''}`}
                                          onChange={handleMessageChange}
                                          onBlur={() => setMessageError(false)}
                                          style={{ flex: 1, marginRight: '10px' }}
                                          placeholder="Enter your message"
                                          required
                                        />
                                        {messageError && <div className="invalid-feedback">Please enter a message.</div>}


                                        <button
                                          onClick={handleSendClick}
                                          className="inflcrbtn btn"
                                          style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                          }}
                                        >
                                          Send
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>

            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Influencermanagecampaigns;
