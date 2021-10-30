/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-30                                                          ║
║                                                                             ║
║  Error 404 page.                                                            ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { Box, Typography } from "@mui/material";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

// Component
const Error404 = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="100px"
        >
            <ReportGmailerrorredIcon sx={{ fontSize: "100px", color: "red" }} />
            <Typography sx={{ mt: 1, textAlign: "center", userSelect: "none" }}>
                Resource not found
                <br />
                <b>Error 404</b>
            </Typography>
        </Box>
    );
};

// Exports
export default Error404;
