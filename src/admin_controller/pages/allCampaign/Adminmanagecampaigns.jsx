import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { baseURL } from "../../../hooks/config";

const Influencermanagecampaigns = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const [data, setData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [SelectedbrandName, setSelectedbrandName] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [selectedInfluencerId, setSelectedInfluencerId] = useState("");
  const [selectedInviteId, setSelectedInviteId] = useState("");
  const [CampainUserId, setCampainUserId] = useState("");
  const [selectedlink, setSelectedlink] = useState("");
  const [inviteStatus, setinviteStatus] = useState("");
  const [postStatus, setPostStatus] = useState();
  const [link, setLink] = useState('');
  const [linkError, setLinkError] = useState(false);
  const [messageError, setMessageError] = useState(false)
  const [message, setMessage] = useState('');;
  const [showModal, setShowModal] = useState(false);
  const [influencerMessages, setinfluencerMessages] = useState([]);
  const [campaignimg, setCampaignimg] = useState("")
  const[influencerimg, setInfluencerimg] = useState ("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        const response = await fetch(`${baseURL}/admin/influencers`, requestOptions);
        const result = await response.json();

        const newData = await Promise.all(
          result.map(async (influencer) => {
            const invitesWithDetails = await Promise.all(
              influencer.influencerInvites.map(async (invite) => {
                const campaignDetailsResponse = await fetch(`${baseURL}/campaign/restrict/${invite.campaignId}`, requestOptions);
                const campaignDetails = await campaignDetailsResponse.json();
                return { ...invite, campaignDetails };
              })
            );

            return { ...influencer, influencerInvites: invitesWithDetails };
          })
        );

        setData(newData);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(data);
    fetchData();
  }, []);

  const handleApplyClick = (campaignName, brandName, influencerName, campaignId, influencerId, inviteId, CampainUserId, polink, inviteStatus, postStatus, influencerMessages, campaignimg, influencerimg) => {
    setSelectedCampaign(campaignName);
    setSelectedbrandName(brandName);
    setSelectedInfluencer(influencerName);
    setSelectedCampaignId(campaignId);
    setSelectedInfluencerId(influencerId);
    setSelectedInviteId(inviteId);
    setCampainUserId(CampainUserId);
    setSelectedlink(polink);
    setinviteStatus(inviteStatus);
    setPostStatus(postStatus);
    setinfluencerMessages(influencerMessages);
    setCampaignimg(campaignimg);
    setInfluencerimg(influencerimg)
    setShowModal(true);
  };

  const handleAction = async (
    inviteId,
    campaignId,
    influencerId,
    userId,
    campaignName,
    influencerName,
    action
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/invite/action/${campaignId}/${influencerId}/${inviteId}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        }
      );

      const result = await response.text();


      if (response.ok) {
        toast.success(
          `Invite ${action === "true" ? "accepted" : "rejected"} successfully`
        );

        const notificationHeaders = new Headers();
        notificationHeaders.append("Content-Type", "application/json");
        notificationHeaders.append("Authorization", `Bearer ${token}`);

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
         ` ${baseURL}/sendNotification`,
          notificationRequestOptions
        )
          .then((response) => response.text())
          .then((result) => {
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
    influencerName,
    event
  ) => {
    event.preventDefault();
    handleAction(
      inviteId,
      campaignId,
      influencerId,
      userId,
      campaignName,
      influencerName,
      "true"
    );
  };

  const handleReject = (
    inviteId,
    campaignId,
    influencerId,
    userId,
    campaignName,
    influencerName,
    event
  ) => {
    event.preventDefault();
    handleAction(
      inviteId,
      campaignId,
      influencerId,
      userId,
      campaignName,
      influencerName,
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
    if (!selectedCampaignId || !selectedInviteId || !selectedInfluencerId || !CampainUserId) {
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
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      textMessage: message,
      link: link,
      isInfluencer: true,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${baseURL}/invite/post/${selectedCampaignId}/${selectedInfluencerId}/${selectedInviteId}`,
        requestOptions
      );
      const result = await response.text();

      if (response.ok) {
        // Send notification
        const notificationBody = {
          textMessage: `Your post for the campaign ${selectedCampaignId} has been sent successfully.`,
          status: "FAILED",
          receiverId: CampainUserId,
        };

        const notificationRequestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(notificationBody),
          redirect: "follow",
        };

        const notificationResponse = await fetch(
          `${baseURL}/sendNotification`,
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


  let serial = 1;
  return (
    <div className="wrapper influencers_sect">
      <AdminHeader />
      <AdminSidebar />
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
                        <th>Sl.</th>
                        <th>Preview</th>
                        <th>Influencer Name</th>
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
                      {data.map((influencer) =>
                        influencer.influencerInvites.map((invite) => (
                          <tr key={invite.id}>
                            <td>{serial++}</td>
                            <td>
                              <img
                                src={
                                  invite.campaignDetails?.campaignPic.pathUri ||
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
                            <td>{influencer.influencerName}</td>
                            <td>
                              {invite.campaignDetails?.campaignName || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.brandName || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.genres.join(", ") || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.socialMedia || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.campaignTypes?.join(", ") || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.country || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.startDate || "Loading..."}
                            </td>
                            <td>
                              {invite.campaignDetails?.endDate || "Loading..."}
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
                                  onClick={() => handleApplyClick(invite.campaignDetails?.campaignName, invite.campaignDetails?.brandName, influencer.influencerName, invite.campaignId, influencer.id, invite.id, invite.campaignDetails?.userId, invite.link, invite.inviteStatus, invite.postStatus, invite.influencerMessages,invite.campaignDetails?.campaignPic.pathUri,influencer.influencerPic.pathUri)}
                                >
                                  <img src="assets/images/apply.svg" alt="" />
                                </Link>


                              )}
                            </td>
                          </tr>
                        ))
                      )}
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
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <h5 className="modal-title">
            <div className="col-12">
              <h4 className="card-title" style={{ fontSize: "20px" }}><strong>Campaign {selectedCampaign} & Brand {SelectedbrandName} Of Influencer {selectedInfluencer}</strong></h4>
              <p className="mt-2"><a href={selectedlink} target="_blank">{selectedlink}</a></p>
            </div>
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body ">
            <div className="card">
              <div className="row no-gutters">
                <div className="col-md-12">
                  <div className="card-body">
                    <div>
  
                      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', }}>
                              <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                {influencerMessages.map((message, index) => (

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
                                      <span ><strong>{message.isInfluencer === true ? selectedCampaign : "You"}</strong></span><br />

                                    </div>
                                    {message.isInfluencer === true ? (
                                      <img
                                        src={influencerimg || "assets/images/default-profile-pic.jpg"}
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
                                        src={campaignimg || "assets/images/infl-product2.jpg"}
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
</div>
                        {inviteStatus === 'SENT' && postStatus === 'EMPTY' && (
                          <div className="mt-3 pb-3 display-center">

                            <button
                              className="btn inflcrbtn mr-2"
                              onClick={(e) =>
                                handleAccept(
                                  selectedInviteId,
                                  selectedCampaignId,
                                  selectedInfluencerId,
                                  CampainUserId,
                                  selectedCampaign,
                                  selectedInfluencer,
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
                                  selectedInviteId,
                                  selectedCampaignId,
                                  selectedInfluencerId,
                                  CampainUserId,
                                  selectedCampaign,
                                  selectedInfluencer,
                                  e
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {inviteStatus === "ACCEPTED" && (postStatus === "EMPTY" || postStatus === "REJECT") && (

                          <div>
                              <div className="mt-2" style={{ display: 'flex', alignItems: 'center' }}>
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
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Influencermanagecampaigns;
