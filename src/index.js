import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import "./assets/style.scss";

import { AuthProvider } from "./store/auth-context";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

ReactDOM.render(
    <AuthProvider>
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE_URI}>
            <App />
        </BrowserRouter>
    </AuthProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
