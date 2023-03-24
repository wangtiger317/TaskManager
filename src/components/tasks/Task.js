import { Card, Form, Button } from "react-bootstrap";
import moment from "moment";
import { useState, Fragment } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import TaskForm from "./TaskForm";
import DeleteTask from "./DeleteTask";
import TaskDetail from "./TaskDetail";

import "./Task.scss";

const Task = (props) => {
    const [editTask, setEditTask] = useState(false);
    const [deleteTask, setDeleteTask] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isCompleted, setIsCompleted] = useState(props.task.completed);

    const label =
        props.task.createdAt === props.task.updatedAt ? "Created" : "Updated";
    const lastActivityTime =
        label + " " + moment(props.task.updatedAt).fromNow();

    const editHandler = () => {
        setEditTask(true);
    };

    const editCloseHandler = () => {
        setEditTask(false);
    };

    const deleteHandler = () => {
        setDeleteTask(true);
    };

    const deleteCloseHandler = () => {
        setDeleteTask(false);
    };

    const detailHandler = () => {
        setShowDetails(true);
    };

    const detailCloseHandler = () => {
        setShowDetails(false);
    };

    const completeChangeHandler = (event) => {
        const newStatus = event.target.checked;
        setIsCompleted(newStatus);

        const formData = {
            completed: newStatus,
        };
        axios
            .patch(`/tasks/${props.task._id}`, formData)
            .then(() => {
                props.onUpdate();
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
                setIsCompleted(!newStatus);
            });
    };

    return (
        <Fragment>
            <Card className="my-1 task">
                <Card.Body>
                    <div className="float-left">
                        <Form.Check
                            type="checkbox"
                            inline
                            checked={isCompleted}
                            onChange={completeChangeHandler}
                            className="custom-checkbox"
                        />

                        <span className="task-title">{props.task.title}</span>
                        <span className="task-description ml-1 text-muted">
                            {props.task.description}
                        </span>
                    </div>
                    <div className="float-right">
                        <Button
                            variant="outline-primary"
                            className="mx-1"
                            onClick={detailHandler}
                        >
                            Details
                        </Button>
                        <Button
                            variant="outline-primary"
                            className="mx-1"
                            onClick={editHandler}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outline-danger"
                            className="mx-1"
                            onClick={deleteHandler}
                        >
                            Delete
                        </Button>
                    </div>
                    <div className="clearfix"></div>
                    <p className="text-muted mb-0">{lastActivityTime}</p>
                </Card.Body>
            </Card>

            {editTask && (
                <TaskForm
                    task={props.task}
                    onClose={editCloseHandler}
                    onSave={props.onUpdate}
                />
            )}

            {deleteTask && (
                <DeleteTask
                    task={props.task}
                    onClose={deleteCloseHandler}
                    onDelete={props.onDelete}
                />
            )}

            {showDetails && (
                <TaskDetail id={props.task._id} onClose={detailCloseHandler} />
            )}
        </Fragment>
    );
};

export default Task;
