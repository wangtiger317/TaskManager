import { useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteTask = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const modalCloseHandler = () => {
        setShowModal(false);
        props.onClose();
    };

    const deleteHandler = (event) => {
        event.preventDefault();
        setSubmitting(true);

        axios
            .delete(`/tasks/${props.task._id}`)
            .then((res) => {
                let data = res.data;
                toast.success(data.message);

                modalCloseHandler();
                props.onDelete();
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    let data = error.response.data;
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
                    setErrorMessage(message);
                }
                setSubmitting(false);
            });
    };

    return (
        <Modal show={showModal} onHide={modalCloseHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessage && (
                    <Alert variant="danger" className="text-center">
                        {errorMessage}
                    </Alert>
                )}

                <p>Are you sure you wan to delete this task?</p>
                <p>Task: {props.task.title}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    type="button"
                    disabled={submitting}
                    onClick={deleteHandler}
                >
                    Delete{" "}
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

export default DeleteTask;
