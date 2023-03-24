import { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import AuthContext from "../store/auth-context";

const AppNavbar = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = (logoutAll) => {
        const url = logoutAll ? "/users/logoutAll" : "/users/logout";
        axios
            .post(url)
            .then((res) => {
                toast.success(res.data.message);
            })
            .catch((error) => {
                let message = "Something went wrong";
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    message = error.response.data.message;
                }
                toast.error(message);
            })
            .then(() => {
                authCtx.setAuthData({
                    token: null,
                    userName: null,
                });

                history.push("/login");
            });
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">
                Task Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {authCtx.isAuthenticated && (
                        <Nav.Link as={NavLink} to="/tasks" exact>
                            Tasks
                        </Nav.Link>
                    )}
                </Nav>
                <Nav>
                    {!authCtx.isAuthenticated && (
                        <Nav.Link as={NavLink} to="/login" exact>
                            Login
                        </Nav.Link>
                    )}
                    {!authCtx.isAuthenticated && (
                        <Nav.Link as={NavLink} to="/register" exact>
                            Register
                        </Nav.Link>
                    )}

                    {authCtx.isAuthenticated && (
                        <NavDropdown alignRight title={authCtx.userName}>
                            <NavDropdown.Item as={NavLink} to="/profile" exact>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={logoutHandler.bind(null, false)}
                            >
                                Logout
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={logoutHandler.bind(null, true)}
                            >
                                Logout All
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
