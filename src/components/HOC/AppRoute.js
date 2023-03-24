import { Fragment, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { Helmet } from "react-helmet";

const AppRoute = ({ children, auth, guest, title, ...rest }) => {
    const authCtx = useContext(AuthContext);

    let renderHandler;

    if (auth && !authCtx.isAuthenticated) {
        renderHandler = ({ location }) => {
            return (
                <Redirect
                    to={{
                        pathname: "/login",
                        search: `?redirect=${location.pathname}`,
                    }}
                />
            );
        };
    } else if (guest && authCtx.isAuthenticated) {
        renderHandler = () => {
            return (
                <Redirect
                    to={{
                        pathname: "/tasks",
                    }}
                />
            );
        };
    } else {
        renderHandler = () => {
            let pageTitle = `Task Manager${title ? ` - ${title}` : ""}`;
            return (
                <Fragment>
                    <Helmet>
                        <title>{pageTitle}</title>
                    </Helmet>
                    {children}
                </Fragment>
            );
        };
    }

    return <Route {...rest} render={renderHandler} />;
};

export default AppRoute;
