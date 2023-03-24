import { Col, Row } from "react-bootstrap";

const NotFound = () => {
    return (
        <Row>
            <Col sm={12} className="mx-0 px-0 text-center">
                <h1 className="display-4 m-4">Oops!</h1>
                <h1 className="display-4 m-4">404 Not Found</h1>
            </Col>
        </Row>
    );
};

export default NotFound;
