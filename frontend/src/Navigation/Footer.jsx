/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-23                                                          ║
║                                                                             ║
║  Main footer.                                                               ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { AppBar, Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <AppBar
            position="static"
            bgcolor="primary.main"
            sx={{ alignItems: "center" }}
        >
            <Typography
                // color="primary.contrastText"
                fontSize="small"
                margin={0.25}
                sx={{
                    userSelect: "none",
                }}
            >
                © 2021 - Vucetic Branislav
            </Typography>
        </AppBar>
    );
};

export default Footer;
