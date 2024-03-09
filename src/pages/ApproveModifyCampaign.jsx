import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../component/Header'
import Sidebar from '../component/Sidebar'

const ApproveModifyCampaign = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="main-panel">
                <div className="content">
                    <div className="page-header mt10">
                        <NavLink className="btn-sm btn-light mr-2" to="campaigns-status.html"><i className="fa fa-arrow-left-long"></i> Back</NavLink>
                        <h1 className="page-title">Approve/Modify</h1>
                    </div>
                    <div className="page-inner">
                        <div className="content-wrapper">
                            <div className="card">
                                <div className="card-body min-vh-70">
                                    <h5 className="mt-2">Link uploaded by Influencer</h5>
                                    <div className="uploaded-video"><NavLink to="#" target="_blank">https://www.youtube.com/watch?v=9xwazD5SyVg</NavLink></div>
                                    <div className="mb-2">
                                        <NavLink to="/campaignsstatus" className="btn btn2 mr-1" type="submit">Approve</NavLink>
                                        <NavLink to="#" className="btn btn2" type="submit" data-target="#Feedback" data-toggle="modal">Share your feedback</NavLink>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="copyright_text">© 2023, Sociopuff. All Rights Reserved</div>
                    </div>
                </div>
            </div>



            <div aria-labelledby="myModalLabel" className="modal fade show upload_quotation" id="Feedback" role="dialog" tabindex="-1" aria-modal="true">
                <div className="modal-dialog mw-500" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title w-100 small-title">Feedback</div>
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span aria-hidden="true">
                                <i className="las la-times"></i></span></button></div>
                        <div className="modal-body mb-0 p-0">
                            <div className="user-form">
                                <ul className="feedback">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                    <li>Nam faucibus leo tincidunt accumsan sodales.</li>
                                    <li>Integer faucibus massa a blandit finibus.</li>
                                    <li>Praesent pretium lacus sit amet elit rhoncus lobortis.</li>
                                </ul>
                                <div className="mt20 d-flex align-content-start">
                                    <NavLink to="/campaignsstatus" data-target="#Feedback2" data-toggle="modal" className="btn btn2 mr-1" type="submit">Send</NavLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div aria-labelledby="myModalLabel" className="modal fade show upload_quotation" id="Feedback2" role="dialog" tabindex="-1" aria-modal="true">
                <div className="modal-dialog mw-500" role="document">
                    <div className="modal-content">
                        <div className="modal-header boder0">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span aria-hidden="true">
                                <i className="las la-times"></i></span></button></div>
                        <div className="modal-body pb-5 text-center">
                            <i className="send-succed fa-sharp fa-solid fa-circle-check"></i>
                            <p className="mt-3">Feedback sent successfully </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApproveModifyCampaign