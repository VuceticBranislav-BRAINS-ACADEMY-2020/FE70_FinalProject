/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-23                                                          ║
║                                                                             ║
║  Main footer.                                                               ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { AppBar, Link, Typography } from "@mui/material";

const Footer = () => {
    return (
        <AppBar
            position="static"
            bgcolor="primary.main"
            sx={{ alignItems: "center" }}
        >
            <Typography
                fontSize="small"
                margin={0.25}
                sx={{
                    userSelect: "none",
                }}
            >
                © 2021&#160;-&#160;
                <Link
                    target="_blank"
                    href="https://github.com/VuceticBranislav"
                    underline="hover"
                    color="inherit"
                >
                    Vucetic Branislav
                </Link>
            </Typography>
        </AppBar>
    );
};

export default Footer;
