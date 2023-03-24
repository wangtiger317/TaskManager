import axios from "axios";
import { useState } from "react";
import { Card, Alert, Form, Button, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const currentPasswordChangeHandler = (event) => {
        setCurrentPassword(event.target.value);
    };

    const newPasswordChangeHandler = (event) => {
        setNewPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        setSubmitting(true);
        const formData = {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
        };

        axios
            .patch("/users/me/password", formData)
            .then((res) => {
                const data = res.data;
                toast.success(data.message);

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setFormErrors({});
                setErrorMessage(null);
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
        <Card>
            <Card.Body>
                <h1 className="text-center">Change Password</h1>
                <hr />
                {errorMessage && (
                    <Alert variant="danger" className="text-center">
                        {errorMessage}
                    </Alert>
                )}

                <Form onSubmit={formSubmitHandler}>
                    <Form.Group controlId="current-password">
                        <Form.Label>Current Password*</Form.Label>
                        <Form.Control
                            type="password"
                            value={currentPassword}
                            onChange={currentPasswordChangeHandler}
                            isInvalid={formErrors.current_password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.current_password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="new-password">
                        <Form.Label>New Password*</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={newPasswordChangeHandler}
                            isInvalid={formErrors.new_password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.new_password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="confirm-password">
                        <Form.Label>Confirm Password*</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={confirmPasswordChangeHandler}
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
                            <Spinner animation="border" role="status" size="sm">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ChangePassword;
