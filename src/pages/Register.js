import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Card, Alert, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";
import toast from "react-hot-toast";

const Register = () => {
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const inputNameField = useRef();
    const inputEmailField = useRef();
    const inputAgeField = useRef();
    const inputPasswordField = useRef();
    const inputConfirmPasswordField = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const formData = {
            name: inputNameField.current.value,
            email: inputEmailField.current.value,
            age: inputAgeField.current.value,
            password: inputPasswordField.current.value,
            confirm_password: inputConfirmPasswordField.current.value,
        };

        setSubmitting(true);
        axios
            .post("/users", formData)
            .then((res) => {
                let data = res.data;
                toast.success(data.message);

                let authData = {
                    token: data.token,
                    userName: data.user.name,
                };
                authCtx.setAuthData(authData);

                history.push("/tasks");
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
                    <h1 className="text-center">Register</h1>
                    <hr />
                    {errorMessage && (
                        <Alert variant="danger" className="text-center">
                            {errorMessage}
                        </Alert>
                    )}
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                                type="text"
                                ref={inputNameField}
                                isInvalid={formErrors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

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

                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="text"
                                ref={inputAgeField}
                                isInvalid={formErrors.age}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.age}
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

                        <Form.Group controlId="confirm_password">
                            <Form.Label>Confirm password*</Form.Label>
                            <Form.Control
                                type="password"
                                ref={inputConfirmPasswordField}
                                isInvalid={formErrors.confirm_password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.confirm_password}
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

export default Register;
