import React from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../component/Header'
import Sidebar from '../component/Sidebar'

const SendCampaign = () => {
    return (
        <div>
            <div className="wrapper">
                <Header />

                {/* <!-- Sidebar --> */}
                <Sidebar />

                <div className="main-panel">
                    <div className="content">
                        <div className="page-header mt10">
                            <NavLink className="btn-sm btn-light mr-2" to="campaigns-status.html"><i className="fa fa-arrow-left-long"></i> Back </NavLink>
                            <h1 className="page-title">Send Campaign</h1>
                        </div>
                        <div className="page-inner">
                            <div className="content-wrapper">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="form-group col-sm-4">
                                                <label for="Region">Select Campaign</label>
                                                <select className="custom-select">
                                                    <option selected>--Select--</option>
                                                    <option>Example 1</option>
                                                    <option>Example 2</option>
                                                    <option>Example 3</option>
                                                </select>
                                            </div>

                                            <div className="form-group col-sm-4">
                                                <label for="Region">Select Influancer</label>
                                                <select className="custom-select">
                                                    <option selected>--Select--</option>
                                                    <option>Example 1</option>
                                                    <option>Example 1</option>
                                                    <option>Example 1</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-sm-4">
                                                <label for="Region">Coupon Code</label>
                                                <input type="text" className="form-control" placeholder="Enter Coupon Code" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label for="Region">Tracking NavLink Information</label>
                                                <input type="text" className="form-control" placeholder="Enter NavLink" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label for="Region">Parameter 1 Value</label>
                                                <input type="text" className="form-control" placeholder="Enter Parameter Value" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label for="Region">Parameter 2 Value</label>
                                                <input type="text" className="form-control" placeholder="Enter Parameter Value" />
                                            </div>
                                            <div className="form-group col-sm-12">
                                                <label for="Region">Parameter 2 Value</label>
                                                <input type="text" className="form-control" placeholder="Enter Parameter Value" />
                                            </div>
                                            <div className="text-right col-sm-12">
                                                <NavLink className="btn add-btn" to="#"><i className="fa fa-plus"></i> Parameter </NavLink>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label for="tpname">Attachment</label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="Pan-cartd" name="filename" />
                                                    <label className="custom-file-label" for="Pan-cartd"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <NavLink className="btn2 btn" data-target="#Campaign-Success" data-toggle="modal" type="submit">Submit </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="copyright_text">© 2023, Sociopuff. All Rights Reserved</div>
                        </div>
                    </div>
                </div>

            </div>



            <div aria-labelledby="myModalLabel" className="modal fade show upload_quotation" id="Campaign-Success" role="dialog" tabindex="-1" aria-modal="true">
                <div className="modal-dialog mw-500" role="document">
                    <div className="modal-content">
                        <div className="modal-header boder0">
                            <button aria-label="Close" className="close" data-dismiss="modal" type="button"><span aria-hidden="true">
                                <i className="las la-times"></i></span></button></div>
                        <div className="modal-body pb-5 text-center">
                            <i className="send-succed fa-sharp fa-solid fa-circle-check"></i>
                            <p className="mt-3">Campaign sent successfully</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendCampaign