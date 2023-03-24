import { useRef, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Card, Alert, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";

const Login = () => {
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);
    const authCtx = useContext(AuthContext);

    const inputEmailField = useRef();
    const inputPasswordField = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const formData = {
            email: inputEmailField.current.value,
            password: inputPasswordField.current.value,
        };

        setSubmitting(true);
        axios
            .post("/users/login", formData)
            .then((res) => {
                let data = res.data;
                let authData = {
                    token: data.token,
                    userName: data.user.name,
                };
                authCtx.setAuthData(authData);

                const redirect = query.get("redirect");
                if (redirect) {
                    history.push(redirect);
                } else {
                    history.push("/tasks");
                }

                // setFormErrors({});
                // setErrorMessage(null);
                // setSubmitting(false);
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    let data = error.response.data;
                    setFormErrors(data.errors);
                    setErrorMessage(data.message);
                } else {
                    let message = "Something went wrong";
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) {
                        message = error.response.data.message;
                    }
                    setFormErrors({});
                    setErrorMessage(message);
                }
                setSubmitting(false);
            });
    };

    return (
        <Row className="mt-4">
            <Card className="m-auto p-1 m-1" style={{ width: "450px" }}>
                <Card.Body>
                    <h1 className="text-center">Login</h1>
                    <hr />
                    {errorMessage && (
                        <Alert variant="danger" className="text-center">
                            {errorMessage}
                        </Alert>
                    )}
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId="email">
                            <Form.Label>Email*</Form.Label>
                            <Form.Control
                                type="text"
                                ref={inputEmailField}
                                isInvalid={formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password*</Form.Label>
                            <Form.Control
                                type="password"
                                ref={inputPasswordField}
                                isInvalid={formErrors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={submitting}
                        >
                            Submit{" "}
                            {submitting && (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    size="sm"
                                >
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    );
};

export default Login;
