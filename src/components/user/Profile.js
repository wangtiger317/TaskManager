import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card, Alert, Spinner, Form, Button } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import toast from "react-hot-toast";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const [loadingError, setloadingError] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submittingError, setSubmittingError] = useState(null);
    const [user, setUser] = useState({});

    const authCtx = useContext(AuthContext);

    const fetchProfile = () => {
        setLoading(true);
        axios
            .get("/users/me")
            .then((res) => {
                setUser(res.data.user);
                setLoading(false);
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
                setloadingError(message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const nameChangeHandler = (event) => {
        setUser((currentUserState) => {
            return {
                ...currentUserState,
                name: event.target.value,
            };
        });
    };

    const emailChangeHandler = (event) => {
        setUser((currentUserState) => {
            return {
                ...currentUserState,
                email: event.target.value,
            };
        });
    };

    const ageChangeHandler = (event) => {
        setUser((currentUserState) => {
            return {
                ...currentUserState,
                age: event.target.value,
            };
        });
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        setSubmitting(true);
        const formData = {
            name: user.name,
            email: user.email,
            age: user.age,
        };

        axios
            .patch("/users/me", formData)
            .then((res) => {
                const data = res.data;
                setUser(data.user);
                authCtx.setUserName(data.user.name);
                toast.success(data.message);

                setFormErrors({});
                setSubmittingError(null);
                setSubmitting(false);
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    let data = error.response.data;
                    setFormErrors(data.errors);
                    setSubmittingError(data.message);
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
                    setSubmittingError(message);
                }
                setSubmitting(false);
            });
    };

    return (
        <Card>
            <Card.Body>
                <h1 className="text-center">Profile</h1>
                <hr />
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" role="status" size="sm">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}

                {loadingError && (
                    <Alert variant="danger" className="text-center">
                        {loadingError}
                    </Alert>
                )}

                {submittingError && (
                    <Alert variant="danger" className="text-center">
                        {submittingError}
                    </Alert>
                )}

                {!loading && !loadingError && (
                    <Form onSubmit={formSubmitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.name}
                                onChange={nameChangeHandler}
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
                                value={user.email}
                                onChange={emailChangeHandler}
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
                                value={user.age || ""}
                                onChange={ageChangeHandler}
                                isInvalid={formErrors.age}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.age}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={submitting}
                        >
                            Update{" "}
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
                )}
            </Card.Body>
        </Card>
    );
};

export default Profile;
