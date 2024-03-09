import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { parseJwt } from "../../../utils/common";
import { baseURL } from "../../../hooks/config";

function AdmincampaignsStatus(props) {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const data = parseJwt(token);
  const [campaignInvites, setCampaignInvites] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [textMessage, setTextMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignResponse = await fetch(`${baseURL}/campaigns`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!campaignResponse.ok) {
          throw new Error(`HTTP error! Status: ${campaignResponse.status}`);
        }

        const campaignResult = await campaignResponse.json();
        setCampaignInvites(campaignResult);

        const influencersResponse = await fetch(`${baseURL}/restricted/influencers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!influencersResponse.ok) {
          throw new Error(`HTTP error! Status: ${influencersResponse.status}`);
        }

        const influencersResult = await influencersResponse.json();
        setInfluencers(influencersResult);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleTextMessageChange = (event) => {
    setTextMessage(event.target.value);
  };

  const sendActionToServer = async (inviteId, influencerId, campaignId, action, textMessage) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({ inviteId, influencerId, campaignId, action, textMessage }),
      };

      const response = await fetch(
        `${baseURL}/invite/post/action/${campaignId}/${influencerId}/${inviteId}/${action}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (action === "true") {
        toast.success("Post accepted successfully");
      } else if (action === "false") {
        toast.error("Send request to modify Post");
      }

      await sendNotification(influencerId, campaignId, action);

      // Reload the page after a successful action
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to send action");
    }
  };

  const sendNotification = async (influencerId, campaignId, action) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const campaignName =
        campaignInvites.find((campaign) => campaign.id === campaignId)?.campaignName || "";
      const brandName =
        campaignInvites.find((campaign) => campaign.id === campaignId)?.brandName || "";
      const statusMessage = action === true ? "Accepted post" : "Request to modify Post";
      const raw = JSON.stringify({
        textMessage: `Campaign ${campaignName} of Brand ${brandName} has been ${statusMessage} by the influencer`,
        status: "FAILED",
        receiverId: selectedCampaign?.influenceruserId,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`${baseURL}/sendNotification`, requestOptions);
      const result = await response.text();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleReject = (inviteId, influencerId, campaignId) => {
    sendActionToServer(inviteId, influencerId, campaignId, "false", textMessage);
  };

  const handleAccept = (inviteId, influencerId, campaignId) => {
    sendActionToServer(inviteId, influencerId, campaignId, "true", textMessage);
  };

  const toggleModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(!showModal);
  };

  let serial = 1;
  return (
    <div>
      <div className="wrapper">
        <AdminHeader />
        <AdminSidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-header mt10">
              <h1 className="page-title">Campaigns Status</h1>
            </div>
            <div className="page-inner">
              <div className="content-wrapper">
                <div className="dasboard-table content_FLX_mdl mt10">
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                      <div>
                        <h1>Loading.....</h1>
                      </div>
                    </div>
                  ) : (
                    <table className="table table-striped table-bordered" id="example2">
                      <thead>
                        <tr>
                          <th>Sl.</th>
                          <th>Campaign Name</th>
                          <th>Brand Name</th>
                          <th>Influencer Name</th>
                          <th>Invite Status</th>
                          <th>Post Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaignInvites.map((campaign) => {
                          if (campaign.campaignInvites && campaign.campaignInvites.length > 0) {
                            return campaign.campaignInvites.map((invite, inviteIndex) => {
                              ;
                              return (
                                <tr>
                                  <td style={{ textAlign: "justify" }}>{serial++}.</td>
                                  <td>
                                    <img src={campaign.campaignPic.pathUri} alt="Campaign" style={{ maxWidth: "40px", maxHeight: "100px" }} />
                                    &nbsp;&nbsp;{campaign.campaignName}
                                  </td>
                                  <td>
                                    <img src={campaign.campaignFiles[0].pathUri} alt="Brand" style={{ maxWidth: "40px", maxHeight: "100px" }} />
                                    &nbsp;&nbsp;{campaign.brandName}
                                  </td>
                                  <td>
                                    <img
                                      src={influencers.find((influencer) => influencer.id === invite.influencerId)?.influencerPic.pathUri}
                                      alt="Influencer"
                                      style={{ maxWidth: "40px", maxHeight: "100px" }}
                                    />
                                    &nbsp;&nbsp;
                                    {influencers.find((influencer) => influencer.id === invite.influencerId)?.influencerName || ""}
                                  </td>
                                  <td>{invite.inviteStatus}</td>
                                  <td>
                                    {invite.postStatus === "SENT" ? (
                                      <span className="text-warning">
                                        <strong>
                                          <i>Pending</i>
                                        </strong>
                                      </span>
                                    ) : invite.postStatus === "REJECT" ? (
                                      <span className="text-danger">
                                        <strong>
                                          <i>Sent to Modify</i>
                                        </strong>
                                      </span>
                                    ) : invite.postStatus === "ACCEPTED" ? (
                                      <span className="text-success">
                                        <strong>
                                          <i>Accepted</i>
                                        </strong>
                                      </span>
                                    ) : (
                                      "--------" || "Loading..."
                                    )}
                                  </td>
                                  <td>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex" }}>
                                      {invite.postStatus === "SENT" && (
                                        <Button
                                          variant="info"
                                          style={{ marginRight: "10px", marginBottom: "10px" }}
                                          onClick={() =>
                                            toggleModal({
                                              campaignName: campaign.campaignName,
                                              brandName: campaign.brandName,
                                              influencerName: influencers.find((influencer) => influencer.id === invite.influencerId)?.influencerName || "",
                                              influenceruserId: influencers.find((influencer) => influencer.id === invite.influencerId)?.userId || "",

                                              link: invite.link,
                                              campaignPicUri: campaign.campaignPic.pathUri,
                                              influencerPicUri: influencers.find((influencer) => influencer.id === invite.influencerId)?.influencerPic.pathUri,
                                              postStatus: invite.postStatus,
                                              id: invite.id,
                                              influencerId: invite.influencerId,
                                              campaignId: campaign.id,
                                              messages: invite.campaignMessages,
                                              senderId: invite.campaignMessages?.[0]?.senderId,
                                              receiverId: invite.campaignMessages?.[0]?.receiverId,
                                            })
                                          }
                                        >
                                          View
                                        </Button>
                                      )}
                                      {invite.postStatus === "ACCEPTED" && (
                                        <Button
                                          variant="info"
                                          style={{ marginRight: "10px", marginBottom: "10px" }}
                                          onClick={() =>
                                            toggleModal({
                                              campaignName: campaign.campaignName,
                                              brandName: campaign.brandName,
                                              influencerName: influencers.find((influencer) => influencer.id === invite.influencerId)?.influencerName || "",
                                              influenceruserId: influencers.find((influencer) => influencer.id === invite.influencerId)?.userId || "",

                                              link: invite.link,
                                              campaignPicUri: campaign.campaignPic.pathUri,
                                              influencerPicUri: influencers.find((influencer) => influencer.id === invite.influencerId)?.influencerPic.pathUri,
                                              postStatus: invite.postStatus,
                                              id: invite.id,
                                              influencerId: invite.influencerId,
                                              campaignId: campaign.id,
                                              messages: invite.campaignMessages,
                                              senderId: invite.campaignMessages?.[0]?.senderId,
                                              receiverId: invite.campaignMessages?.[0]?.receiverId,
                                            })
                                          }
                                        >
                                          View
                                        </Button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            });
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="copyright_text">© 2023, Sociopuff. All Rights Reserved</div>
            </div>
          </div>
        </div>{" "}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>
            <h4 className="card-title" style={{ fontSize: "25px;" }}><strong> Influencer {selectedCampaign?.influencerName} for  Campaign {selectedCampaign?.campaignName} of Brand {selectedCampaign?.brandName} </strong></h4>
            <p className="mt-2"><a href={selectedCampaign?.link} target="_blank">{selectedCampaign?.link}</a></p>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="row no-gutters">
              <div className="col-md-12">
                {selectedCampaign && (
                  <div className="p-5">
                    {selectedCampaign.messages && selectedCampaign.messages.map((message, index) => (
                      <div key={index} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: message.senderId === selectedCampaign.influencerId ? 'flex-end' : 'flex-start' }}>
                        <div style={{ textAlign: 'left', marginBottom: '5px' }}>

                          <span>{message.senderId === selectedCampaign.influencerId ? selectedCampaign.influencerName : "You"}</span>
                        </div>
                        <div style={{ backgroundColor: message.senderId === selectedCampaign.influencerId ? '#E5E7E9' : '#DCF8C6', padding: '10px', borderRadius: '10px', maxWidth: '80%', wordWrap: 'break-word', textAlign: 'left' }}>
                          {message.senderId === selectedCampaign.influencerId && (

                            <img
                              src={selectedCampaign.influencerPicUri}
                              alt="Influencer"
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginRight: '10px',
                              }}
                            />

                          )}
                          {message.senderId !== selectedCampaign.influencerId && (

                            <img
                              src={selectedCampaign.campaignPicUri}
                              alt="Campaign"
                              style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginRight: '10px',
                              }}
                            />

                          )}

                          {message.textMessage}
                        </div>
                      </div>
                    ))}



                    <br />
                    {selectedCampaign.postStatus === "SENT" && (
                      <div>
                        <textarea className="form-control"
                          value={textMessage}
                          onChange={handleTextMessageChange}
                          placeholder="Enter your feedback here..."
                          rows="4"
                          style={{ width: "100%", marginTop: "10px" }}
                        /><br />
                        <div style={{ textAlign: "right", marginTop: "10px" }}>
                          <Button variant="success" onClick={() => handleAccept(selectedCampaign.id, selectedCampaign.influencerId, selectedCampaign.campaignId)}>
                            Approved
                          </Button>{" "}
                          <Button variant="danger" onClick={() => handleReject(selectedCampaign.id, selectedCampaign.influencerId, selectedCampaign.campaignId)}>
                            Send to modify
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
}

export default AdmincampaignsStatus;
