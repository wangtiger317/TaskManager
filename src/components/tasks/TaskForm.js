import { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";

const TaskForm = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const [taskTitle, setTaskTitle] = useState(props.task.title || "");
    const [taskDescription, setTaskDescription] = useState(
        props.task.description || ""
    );

    const modalCloseHandler = () => {
        setShowModal(false);
        props.onClose();
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setSubmitting(true);

        const formData = {
            title: taskTitle,
            description: taskDescription,
        };

        let request;
        if (props.task._id) {
            request = axios.patch(`/tasks/${props.task._id}`, formData);
        } else {
            request = axios.post("/tasks", formData);
        }

        request
            .then((res) => {
                let data = res.data;
                toast.success(data.message);

                modalCloseHandler();
                props.onSave();
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
        <Modal show={showModal} onHide={modalCloseHandler}>
            <Form onSubmit={formSubmitHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.task._id ? "Edit Task" : "Add Task"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && (
                        <Alert variant="danger" className="text-center">
                            {errorMessage}
                        </Alert>
                    )}

                    <Form.Group controlId="title">
                        <Form.Label>Title*</Form.Label>
                        <Form.Control
                            type="text"
                            value={taskTitle}
                            onChange={(event) => {
                                setTaskTitle(event.target.value);
                            }}
                            isInvalid={formErrors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description*</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={taskDescription}
                            onChange={(event) => {
                                setTaskDescription(event.target.value);
                            }}
                            isInvalid={formErrors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
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
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={modalCloseHandler}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default TaskForm;
