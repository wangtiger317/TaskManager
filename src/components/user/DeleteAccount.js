import { Fragment, useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import DeleteAccountModal from "./DeleteAccountModal";

const DeleteAccount = () => {
    const [deleteAccount, setDeleteAccount] = useState(false);
    const authCtx = useContext(AuthContext);
    const history = useHistory()

    const deleteClickHandler = () => {
        setDeleteAccount(true);
    };

    const deleteModalCloseHandler = () => {
        setDeleteAccount(false);
    };

    const accountDeleteHandler = () => {
        let authData = {
            token: null,
            userName: null,
        };
        authCtx.setAuthData(authData);
        history.push("/login");
    };

    return (
        <Fragment>
            <Card className="border-danger">
                <Card.Body>
                    <h1 className="text-center">Delete Account</h1>
                    <hr />
                    <p>
                        Once you delete your account, all data associated with
                        this account will be permanently lost and there is no
                        going back.
                    </p>
                    <Button variant="danger" onClick={deleteClickHandler}>
                        Delete account
                    </Button>
                </Card.Body>
            </Card>

            {deleteAccount && (
                <DeleteAccountModal
                    onClose={deleteModalCloseHandler}
                    onDelete={accountDeleteHandler}
                />
            )}
        </Fragment>
    );
};

export default DeleteAccount;
