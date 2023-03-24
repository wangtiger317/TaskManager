import { useCallback, useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const TaskDetail = (props) => {
    const [showModal, setShowModal] = useState(true);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [task, setTask] = useState(null);
    const taskId = props.id;

    const modalCloseHandler = () => {
        setShowModal(false);
        props.onClose();
    };

    const localDateTime = (dateTime) => {
        return moment(dateTime).format("DD-MM-YYYY HH:mm A");
    };

    const fetchTask = useCallback(() => {
        setLoading(true);

        axios
            .get(`/tasks/${taskId}`)
            .then((res) => {
                setTask(res.data.task);
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
                setErrorMessage(message);
                setLoading(false);
            });
    }, [taskId]);

    useEffect(() => {
        fetchTask();
    }, [fetchTask]);

    return (
        <Modal show={showModal} onHide={modalCloseHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" role="status" size="sm">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                )}

                {!loading && errorMessage && (
                    <Alert variant="danger" className="text-center">
                        {errorMessage}
                    </Alert>
                )}

                {!loading && !errorMessage && (
                    <div className="mx-1">
                        <p>
                            <span className="text-muted">Title:</span>{" "}
                            {task.title}
                        </p>
                        <p>
                            <span className="text-muted">Description:</span>{" "}
                            {task.description}
                        </p>
                        <p>
                            <span className="text-muted">Status:</span>{" "}
                            {task.completed ? "Complete" : "Incomplete"}
                        </p>
                        <br />
                        <p>
                            <span className="text-muted">Created At:</span>{" "}
                            {localDateTime(task.createdAt)}
                        </p>
                        <p>
                            <span className="text-muted">Updated At:</span>{" "}
                            {localDateTime(task.updatedAt)}
                        </p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    type="button"
                    onClick={modalCloseHandler}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskDetail;
