import {useNavigate} from "react-router";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import React, {useEffect, useState} from "react";
import { baseURL } from "../hooks/config";
const Dashboardbrand = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [campaignData, setCampaignData] = useState(null);

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
          `${baseURL}/campaigns`,
          requestOptions
        );
        const result = await response.json();

        if (result.length === 0) {
          console.log(
            "Campaign data not found. Redirecting to the specified page."
          );

          navigate("/createcampaign");
        } else {
          setCampaignData(result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <Sidebar />
        <div className="main-panel">
          <div className="content">
            <div className="page-inner mt30">
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile1">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Example 1</p>
                          <h1>1231</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile2">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Example 2</p>
                          <h1>1231</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 tiles">
                    <div className="tiles-main bg-tile3">
                      <div className="bubble-shadow">
                        <div className="text_pnl">
                          <p>Example 3</p>
                          <h1>1231</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-head-row">
                          <h4 className="card-title">Call Status Wise</h4>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="chart-container">
                          <canvas id="totalIncomeChart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Analysis Call</h4>
                      </div>
                      <div className="card-body">
                        <div className="chart-container">
                          <canvas id="multipleLineChart1"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <div className="card-head-row">
                          <h4 className="card-title">Latest Transactions</h4>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title clrblk rounded bg-transaction">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title clrblk rounded bg-transaction">
                              <i className="fa-sharp fa-solid fa-left-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment received from Redwhale
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-success">
                              $12,200.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title clrblk rounded bg-transaction">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title clrblk rounded bg-transaction">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title clrblk rounded bg-transaction">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Upcoming Transactions</h4>
                      </div>
                      <div className="card-body">
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title rounded bg-info">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title rounded bg-secondary">
                              <i className="fa-sharp fa-solid fa-left-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment received from Redwhale
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-success">
                              $12,200.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title rounded bg-danger">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title rounded bg-info">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex pb-2">
                          <div className="avatar-sm avatar-online">
                            <span className="avatar-title rounded bg-secondary">
                              <i className="fa-sharp fa-solid fa-right-long fa-fw"></i>
                            </span>
                          </div>
                          <div className="flex-1 ml-3">
                            <h6 className="text-uppercase fw-bold mb-1">
                              Payment sent to Sakir
                            </h6>
                            <span className="text-uppercase text-muted">
                              Sep 23
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <h6 className="text-uppercase text-danger">
                              $560.00
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="copyright_text">
                © 2023, Sociopuff. All Rights Reserved
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Dashboardbrand;
