/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-25                                                          ║
║                                                                             ║
║  Front page containing welcome screen and buttons for log in and sign in.   ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { Paper, Typography, Box, CardMedia } from "@mui/material";
import ButtonLogIn from "../Components/LogIn/ButtonLogIn";
import ButtonSignIn from "../Components/LogIn/ButtonSignIn";
import imgWelcome from "../Resources/Welcome.jpg";
import { PingServer } from "../Components/PingServer";

// Welcom page including login buttons and image
const Welcome = () => {
    const [serverStatus, setServerStatus] = React.useState(false);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
                variant="body1"
                sx={{ mt: 5, textAlign: "center", userSelect: "none" }}
            >
                Bookkeeping application made as part of final exam.
                <br />
                BRAINS 2021 requalification course.
            </Typography>
            <Box>
                <Paper variant="outlined" sx={{ mb: 2 }}>
                    <CardMedia component="img" image={imgWelcome} alt="image" />
                </Paper>

                <ButtonLogIn />
                <ButtonSignIn />
            </Box>
            <Typography
                variant="body"
                sx={{
                    fontSize: "small",
                    fontStyle: "italic",
                    textAlign: "center",
                }}
            >
                Login to application with predefined accounts or create new.
                <br />
                Username: "<b>user</b>", Password: "<b>user</b>" or
                <br />
                Username: "<b>admin</b>", Password: "<b>admin</b>"
            </Typography>
            <PingServer />
        </Box>
    );
};

// Exports
export default Welcome;
