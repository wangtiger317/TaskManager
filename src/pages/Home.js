import { Col, Jumbotron, Row } from "react-bootstrap";

const Home = () => {
    return (
        <Row>
            <Col sm={12} className="mx-0 px-0">
                <Jumbotron>
                    <h1 className="display-4">Task Manager</h1>
                    <p className="lead">
                        Simple task manager to keep track of your todos and
                        notes.
                    </p>
                </Jumbotron>
            </Col>
        </Row>
    );
};

export default Home;
