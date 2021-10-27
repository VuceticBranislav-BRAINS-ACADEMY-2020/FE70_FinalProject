/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-22                                                          ║
║                                                                             ║
║  Provide context used to wrap another elements with registration.           ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useState, useContext, createContext } from "react";

// Create context
const registerContext = createContext();

// Context wrapper
const ProvideRegister = ({ children }) => {
    const auth = useProvideRegister();
    return (
        <registerContext.Provider value={auth}>
            {children}
        </registerContext.Provider>
    );
};

// Return context
const useRegister = () => {
    return useContext(registerContext);
};

const useProvideRegister = () => {
    const [signin, setSignin] = useState(null);
    const [error, setError] = useState("");

    const register = (
        username,
        password,
        failCallback = () => {},
        okCallback = () => {}
    ) => {
        fetch("http://localhost:3081/app/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "ok") {
                    setSignin(null);
                    setError(data.body);
                    failCallback();
                } else {
                    setSignin(data.body);
                    setError("");
                    okCallback();
                }
            })
            .catch((err) => {
                setSignin(null);
                setError(err.message);
                failCallback();
            });
    };

    return [signin, error, register];
};

// Exports
export { ProvideRegister, useRegister };
