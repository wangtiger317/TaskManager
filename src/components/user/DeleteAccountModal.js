import axios from "axios";
import { useState } from "react";
import { Modal, Alert, Button, Spinner, Form } from "react-bootstrap";
import toast from "react-hot-toast";

const DeleteAcccountModal = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const modalCloseHandler = () => {
        setShowModal(false);
        props.onClose();
    };

    const confirmChangeHandler = (event) => {
        setConfirmDelete(event.target.checked);
    };

    const deleteHandler = () => {
        setSubmitting(true);

        axios
            .delete("/users/me")
            .then((res) => {
                let data = res.data;
                toast.success(data.message);

                setErrorMessage(null);
                setSubmitting(false);

                props.onDelete();
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
                setErrorMessage(message);
                setSubmitting(false);
            });
    };

    return (
        <Modal show={showModal} onHide={modalCloseHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && (
                    <Alert variant="danger" className="text-center">
                        {errorMessage}
                    </Alert>
                )}

                <Form.Group controlId="confirm-delete">
                    <Form.Label>
                        <div className="d-inline-block">
                            <Form.Check
                                type="checkbox"
                                checked={confirmDelete}
                                onChange={confirmChangeHandler}
                            />
                        </div>
                        I understand the result of this action, i want to delete
                        my account permanently.
                    </Form.Label>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    type="submit"
                    disabled={submitting || !confirmDelete}
                    onClick={deleteHandler}
                >
                    Delete Account{" "}
                    {submitting && (
                        <Spinner animation="border" role="status" size="sm">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )}
                </Button>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={modalCloseHandler}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAcccountModal;
