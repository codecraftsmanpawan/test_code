import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./hooks/authProvider";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {TypeProvider} from "./hooks/type-context";
import 'wowjs/css/libs/animate.css';
import './pages/App.css';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleOAuthProvider clientId="356648227693-d2542nq5t4ml284b3a8eb63cvmd8369t.apps.googleusercontent.com">
          <TypeProvider>
            <App />
          </TypeProvider>{" "}
        </GoogleOAuthProvider>{" "}
      </AuthProvider>{" "}
    </BrowserRouter>{" "}
  </React.StrictMode>
);
