/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-23                                                          ║
║                                                                             ║
║  Main header. Contains logo and function buttons.                           ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { AppBar, Box, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Logo from "./Logo";
import ButtonSignOut from "../Components/SignIn/ButtonSignOut";
import { useAuth } from "../Authentication/ProvideAuth";
import { ThemeButton } from "../Pages/ToggleColorMode";

// Header elements with all buttons and logo
const Header = () => {
    const [login, error, signin, signout] = useAuth();

    return (
        <AppBar position="static" color="primary" mt={0.5}>
            <Box display="flex" flexDirection="row">
                <Logo />
                <span style={{ flexGrow: 1 }} />
                {login ? (
                    <Box display="flex" flexDirection="row">
                        <Box display="flex" flexDirection="column">
                            <Box
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-end"
                            >
                                <Typography
                                    mr="5px"
                                    mt="3px"
                                    color="gold"
                                    textAlign="center"
                                >
                                    {login.username}
                                </Typography>
                            </Box>
                            <ButtonSignOut />
                        </Box>
                        <AccountBoxIcon
                            sx={{ fontSize: "64px", color: "gold" }}
                        />
                    </Box>
                ) : (
                    ""
                )}
                <ThemeButton />
            </Box>
        </AppBar>
    );
};

// Exports
export default Header;
