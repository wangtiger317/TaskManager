import { Fragment, useCallback, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Switch, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound.js";
import AuthContext from "./store/auth-context";

import AppRoute from "./components/HOC/AppRoute";

let isFirstRender = true;

function App() {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    const authToken = authCtx.token;

    const setAxiosAuthToken = useCallback((authToken) => {
        if (authToken !== null) {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + authToken;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, []);

    if (isFirstRender) {
        axios.interceptors.response.use(undefined, (error) => {
            if (error.response && error.response.status === 401) {
                authCtx.setAuthData({
                    token: null,
                    userName: null,
                });

                history.push({
                    pathname: "/login",
                    search: `?redirect=${location.pathname}`,
                });
            }
            return Promise.reject(error);
        });

        setAxiosAuthToken(authToken);
    }

    useEffect(() => {
        if (!isFirstRender) {
            setAxiosAuthToken(authToken);
        }
        isFirstRender = false;
    }, [setAxiosAuthToken, authToken]);

    return (
        <Fragment>
            <Toaster />
            <Navbar></Navbar>
            <Container fluid>
                <Switch>
                    <AppRoute path="/" exact title="Home">
                        <Home />
                    </AppRoute>

                    <AppRoute path="/login" guest title="Login">
                        <Login />
                    </AppRoute>
                    <AppRoute path="/register" guest title="Register">
                        <Register />
                    </AppRoute>

                    <AppRoute path="/tasks" auth title="Tasks">
                        <Tasks />
                    </AppRoute>
                    <AppRoute path="/profile" auth title="Profile">
                        <Profile />
                    </AppRoute>

                    <AppRoute path="*">
                        <NotFound />
                    </AppRoute>
                </Switch>
            </Container>
        </Fragment>
    );
}

export default App;
