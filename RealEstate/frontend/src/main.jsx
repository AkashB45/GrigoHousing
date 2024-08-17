// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-r7c2ij5l4bw1lseq.us.auth0.com";
const clientId = "B2Sk3Hbgbi4hyOTyd6WHke4ww9FTd1xr";
const audience = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "https://grigo-housing.vercel.app",
      }}
      audience =  {audience}
      scope =  "openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
