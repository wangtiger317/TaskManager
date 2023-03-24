import { Row, Col } from "react-bootstrap";

import ChangePassword from "../components/user/ChangePassword";
import Profile from "../components/user/Profile";
import DeleteAccount from "../components/user/DeleteAccount";

const ProfilePage = () => {
    return (
        <Row className="mt-4">
            <Col md={6} className="my-1">
                <Profile />
            </Col>
            <Col md={6} className="my-1">
                <ChangePassword />
            </Col>
            <Col md={12} className="my-1">
                <DeleteAccount />
            </Col>
        </Row>
    );
};

export default ProfilePage;
