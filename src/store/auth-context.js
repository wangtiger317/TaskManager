import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    token: null,
    userName: null,
    isAuthenticated: false,
    setAuthData: (authData) => {},
    setUserName: (userName) => {},
});

export default AuthContext;

export const AuthProvider = (props) => {
    let initialState = {
        token: null,
        userName: null,
    };
    const authData = localStorage.getItem("auth");
    if (authData) {
        initialState = JSON.parse(authData);
    }

    const [token, setToken] = useState(initialState.token);
    const [userName, setUsername] = useState(initialState.userName);

    useEffect(() => {
        localStorage.setItem(
            "auth",
            JSON.stringify({
                token: token,
                userName: userName,
            })
        );
    }, [token, userName]);

    const setAuthDataHandler = (authData) => {
        setToken(authData.token);
        setUsername(authData.userName);
    };

    const setUserNameHandler = (userName) => {
        setUsername(userName);
    };

    const authContext = {
        token: token,
        userName: userName,
        isAuthenticated: token !== null ? true : false,
        setAuthData: setAuthDataHandler,
        setUserName: setUserNameHandler,
    };

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    );
};
