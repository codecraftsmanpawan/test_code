import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Createcampaign from "./pages/Createcampaign";
import Campaignsstatus from "./pages/Campaignsstatus";
import Influencers from "./pages/Influencers";
import Howitworks from "./pages/Howitworks";
import Reportanalytics from "./pages/Reportanalytics";
import Wishlist from "./pages/Wishlist";
import Allinvities from "./pages/Allinvities";
import Dashboardbrand from "./pages/Dashboardbrand";
import Influencercreate from "./pages/Influencercreate";
import Yourcampaigns from "./pages/Yourcampaigns";
import Influencerdetail from "./pages/Influencerdetail";
import Dashboardinfluencer from "./pages/Dashboardinfluencer";
import Influencerdiscovercampaigns from "./pages/Influencerdiscovercampaigns";
import Influencermanagecampaigns from "./pages/Influencermanagecampaigns";
import Influencerinfluencers from "./pages/Influencerinfluencers";
import Createaccountinfluencer from "./pages/Createaccountinfluencer";
import Createaccount from "./pages/Createaccount";
import {Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import GetInfluencers from "./GetDataFunctions/GetInfluencers";
import CampaignInviteInfluencers from "./pages/CampaignInviteInfluencers";
import SendCampaign from "./pages/SendCampaign";
import ApproveModifyCampaign from "./pages/ApproveModifyCampaign";
import Campaininvite from "./pages/Campaininvite";
import Influencernotifications from "./pages/Influencernotifications";
import Postsend from "./pages/Postsend";

import Admin from "./admin_controller/admin-auth/Admin";
import AdminDashboard from "./admin_controller/pages/adminDashboard/AdminDashboard";
import AllCampaignAdmin from "./admin_controller/pages/allCampaign";
import CreateCampaignAdmin from "./admin_controller/pages/allCampaign/createCapmaign/CreateCampaignAdmin";
import AllInfluencersFIlter from "./admin_controller/pages/allInfluencers/AllInfluencersFIlter";
import CreateInfluencers from "./admin_controller/pages/allInfluencers/createInfluencers/CreateInfluencers";
import AdmincampaignsStatus from "./admin_controller/pages/campaigns-status/AdmincampaignsStatus";
import Adminwishlist from "./admin_controller/pages/Wishlist/Adminwishlist";
import Admininvite from "./admin_controller/pages/Invite/Admininvite";
import Allinfluencer from "./admin_controller/pages/allInfluencers/Allinfluencer";
import Adminmanagecampaigns from "./admin_controller/pages/allCampaign/Adminmanagecampaigns";
import Allincampaigns from "./admin_controller/pages/allCampaign/Allincampaigns";

function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored"> </ToastContainer>{" "}
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/createcampaign" element={<Createcampaign />} />{" "}
        <Route path="/campaignsstatus" element={<Campaignsstatus />} />{" "}
        <Route path="/influencercreate" element={<Influencercreate />} />{" "}
        <Route path="/influencers" element={<Influencers />} />{" "}
        <Route path="/howitworks" element={<Howitworks />} />{" "}
        <Route path="/reportanalytics" element={<Reportanalytics />} />{" "}
        <Route path="/wishlist" element={<Wishlist />} />{" "}
        <Route path="/allinvities" element={<Allinvities />} />{" "}
        <Route path="/dashboardbrand" element={<Dashboardbrand />} />{" "}
        <Route path="/yourcampaigns" element={<Yourcampaigns />} />{" "}
        <Route path="/campaigninvite/:campaignId" component={Campaininvite} />{" "}
        <Route path="/:influencerId" element={<Influencerdetail />} />{" "}
        <Route path="/postsend" element={<Postsend />} />{" "}
        <Route
          path="/campaigninviteinfluencers/:campaignId"
          element={<CampaignInviteInfluencers />}
        />{" "}
        <Route path="/dashboardinfluencer" element={<Dashboardinfluencer />} />{" "}
        <Route path="/createaccount" element={<Createaccount />} />{" "}
        <Route path="/sendcampaign" element={<SendCampaign />} />{" "}
        <Route
          path="/approvemodifycampaign"
          element={<ApproveModifyCampaign />}
        />{" "}
        <Route
          path="/createaccountinfluencer"
          element={<Createaccountinfluencer />}
        />{" "}
        <Route
          path="/influencerinfluencers"
          element={<Influencerinfluencers />}
        />{" "}
        <Route
          path="/influencermanagecampaigns"
          element={<Influencermanagecampaigns />}
        />{" "}
        <Route
          path="/influencerdiscovercampaigns"
          element={<Influencerdiscovercampaigns />}
        />{" "}
        <Route
          path="/influencernotifications"
          element={<Influencernotifications />}
        />{" "}
        <Route path="/adminlogin" element={<Admin />} />{" "}
        <Route path="/admindashboard" element={<AdminDashboard />} />{" "}
        <Route path="/createinfluenceradmin" element={<CreateInfluencers />} />{" "}
        <Route path="/allinfluenceradmin" element={<AllInfluencersFIlter />} />{" "}
        <Route path="/createcampaignadmin" element={<CreateCampaignAdmin />} />{" "}
        <Route path="/allcampaignadmin" element={<AllCampaignAdmin />} />{" "}
        <Route path="/adminwishlist" element={<Adminwishlist />} />{" "}
        <Route path="/admininvite" element={<Admininvite />} />{" "}
        <Route path="/allinfluencer" element={<Allinfluencer />} />{" "}
        <Route path="/adminmanagecampaigns" element={<Adminmanagecampaigns />} />{" "}
        <Route path="/allincampaigns" element={<Allincampaigns />} />{" "}
        <Route
          path="/admincampaignsStatus"
          element={<AdmincampaignsStatus />}
        />{" "}
      </Routes>{" "}
      <GetInfluencers />
    </div>
  );
}

export default App;
