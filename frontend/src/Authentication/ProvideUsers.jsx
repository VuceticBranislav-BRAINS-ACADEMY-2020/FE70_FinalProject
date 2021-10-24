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
const userContext = createContext();

// Context wrapper for authentication data.
// Parameters:
//   children - Elements that should be wraped by this context.
// Return:
//   Provided children elements wraped in context that contains authentication data.
const ProvideUsers = ({ children }) => {
    const auth = useProvideAuth();
    return <userContext.Provider value={auth}>{children}</userContext.Provider>;
};

// Return authentication context
const useUsers = () => {
    return useContext(userContext);
};

/*
app.post('/app/register', async (req, res) => {
    obj = req.body;
    if(data.logins[obj.username]){
        res.send(toerr("User already exists."));
    }else{
        data.logins[obj.username] = obj;
        res.send(took(obj));
    }
});
 */
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
    const [meterValue, setMeterValue] = useState(0);
    const [ready, setReady] = useState(false);

    // Signin user with provided username and password.
    // If error occure log it to error state.
    const signin = (
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

    // const setMeter = (pass1, pass2) => {
    //     // Is valid
    //     let r = pass1 === pass2;
    //     if (pass1 === "" || pass2 === "") r = false;

    //     // Strength
    //     let points = 0;
    //     if (pass1.toUpperCase() !== pass1) points++;
    //     if (pass1.toLowerCase() !== pass1) points++;
    //     if (pass1.length >= 8) points++;
    //     if (/[!“#$%&/()=?*]+/.test(pass1)) points++;

    //     if (points < 2) r = false;

    //     setReady(r);
    //     setMeterValue(points);
    // };
    // return [login, error, signin, meterValue, setMeter, ready];
    return [login, error, signin];
};

// Exports
export { ProvideUsers, useUsers };
