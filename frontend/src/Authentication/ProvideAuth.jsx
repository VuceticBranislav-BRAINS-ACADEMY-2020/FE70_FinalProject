/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║                                                                             ║
║  Provide authentication context used to wrap another elements. Context      ║
║  provide informations about logged user.                                    ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useState, useContext, createContext } from "react";

// Create authentication context
const authContext = createContext();

// Context wrapper for authentication data.
// Parameters:
//   children - Elements that should be wraped by this context.
// Return:
//   Provided children elements wraped in context that contains authentication data.
const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Return authentication context
const useAuth = () => {
    return useContext(authContext);
};

// Provides user login status and functions to singin and singout to context.
// Parameters:
// Return:
//   login   - Contains username and password provided by backend server,
//   error   - Errors occured during singin process,
//   signin  - Function to singin user,
//   signout - Function to singout user
const useProvideAuth = () => {
    // States of login informations and errors
    const [login, setLogin] = useState(null);
    const [error, setError] = useState("");

    // Signin user with provided username and password.
    // If error occure log it to error state.
    const signin = (
        username,
        password,
        failCallback = () => {},
        okCallback = () => {}
    ) => {
        fetch("http://localhost:3081/app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "ok") {
                    setLogin(null);
                    setError(data.body);
                    failCallback();
                } else {
                    setLogin(data.body);
                    setError("");
                    okCallback();
                }
            })
            .catch((err) => {
                setLogin(null);
                setError(err.message);
                failCallback();
            });
    };

    // Log out current user by clearing login and error states
    const signout = (cb = () => {}) => {
        setLogin(null);
        setError("");
        cb();
    };

    return [login, error, signin, signout];
};

// Exports
export { ProvideAuth, useAuth };
