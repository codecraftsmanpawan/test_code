import axios from "axios";
import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import {parseJwt} from "../utils/common";
import {ROLE_BRAND, ROLE_INFLUENCER} from "../utils/constants";
import React from "react";
import { baseURL } from "../hooks/config";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const localStorageToken = JSON.parse(localStorage.getItem("accessToken"));
  const localStorageIdToken = JSON.parse(localStorage.getItem("idToken"));
  const [token, setToken] = useState(
    localStorageToken && localStorageToken?.accessToken
  );
  const [idToken, setIdToken] = useState(
    localStorageIdToken && localStorageIdToken?.idToken
  );
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const LoginInputHandle = async () => {
    if (loading) return;

    if (username !== "" && password !== "") {
      setLoading(true);
      const data = {username: username, password: password};
      try {
        const res = await axios.post(
          `${baseURL}/user/authenticate`,
          data
        );
        if (res.status === 201) {
          localStorage.setItem(
            "token",
            JSON.stringify({
              accessToken: res.data.accessToken,
              idToken: res.data.idToken,
            })
          );

          setToken(res.data.accessToken);
          setIdToken(res.data.idToken);

          const accessToken = res.data.accessToken;
          const accessTokenParse = parseJwt(accessToken);

          if (accessTokenParse.roles[0] === ROLE_BRAND) {
            navigate(`/dashboardbrand`);
          } else if (accessTokenParse.roles[0] === ROLE_INFLUENCER) {
            navigate(`/dashboardinfluencer`);
          }

          toast.success("Log In Successfully", {
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Login Failed");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Enter Proper Password");
    }
  };

  const LogOutHandle = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUserName,
        password,
        setPassword,
        LoginInputHandle,
        LogOutHandle,
        idToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export {useAuth, AuthProvider};
