/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-25                                                          ║
║                                                                             ║
║  Header logo.                                                               ║
║  Click on logo lead to welcom page of all books page if user is loged in.   ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { Box, Typography } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { useAuth } from "../Authentication/ProvideAuth";
import { useHistory } from "react-router-dom";

// Logo elements that lead to welcom page if user is not loged in.
// If user is loged in then click lead to all books page.
const Logo = () => {
    const [login, error, signin, signout] = useAuth();
    let history = useHistory();
    return (
        <Box
            sx={{
                margin: 1,
                border: 1,
                paddingX: 1.5,
                paddingY: 1,
                borderRadius: 3,
                display: "flex",
                flexDirection: "row",
            }}
            to="/"
            onClick={() => {
                let location = {
                    pathname: "/",
                    state: { fromDashboard: true },
                };
                if (login) {
                    location = {
                        pathname: "/allbooks",
                        state: { fromDashboard: true },
                    };
                }
                history.push(location);
            }}
        >
            <BlurOnIcon fontSize="large" sx={{ color: "gold", mr: 1.5 }} />
            <Typography
                variant="body1"
                color="inherit"
                fontSize="h5.fontSize"
                fontStyle="italic"
                fontWeight="bold"
                sx={{
                    userSelect: "none",
                }}
            >
                Booker
            </Typography>
        </Box>
    );
};

// Exports
export default Logo;
