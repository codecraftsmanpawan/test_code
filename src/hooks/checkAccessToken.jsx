import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const checkAccessToken = navigate => {
  const localStorageToken = JSON.parse(localStorage.getItem("accessToken"));

  if (!localStorageToken || !localStorageToken.accessToken) {
    navigate("/login");
    return false; // Indicate that access token is not available
  }

  return true; // Indicate that access token is available
};

export default checkAccessToken;
