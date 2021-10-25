/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-25                                                          ║
║                                                                             ║
║  Front page containing welcome screen and butons for log in and sign in.    ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import ButtonLogIn from "../Components/LogIn/ButtonLogIn";
import ButtonSignIn from "../Components/LogIn/ButtonSignIn";

const Welcome = () => {
    return (
        <Box
            //     sx={{
            //         minWidth: 275,
            //         margin: "0px",
            //         padding: "0px",
            //         minHeight: "100vh",
            //         height: "300px",
            //     }}
            // >
            // <Card
            variant="outlined"
            sx={{
                minWidth: "500px",
                margin: "0px",
                padding: "0px",
                height: "300px",
            }}
        >
            <ButtonLogIn />
            <ButtonSignIn />
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography>
            {/* </Card> */}
        </Box>
    );
};

// Exports
export default Welcome;
