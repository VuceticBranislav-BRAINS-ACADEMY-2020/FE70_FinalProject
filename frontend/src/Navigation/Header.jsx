/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-23                                                          ║
║                                                                             ║
║  Main header contains logo and function buttons.                            ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { useHistory } from "react-router-dom";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NavBar from "./NavBar";
import ButtonSignOut from "../Components/SignIn/ButtonSignOut";
import { useAuth } from "../Authentication/ProvideAuth";
import Logo from "./Logo";

// Header elements with all buttons and logo
const Header = () => {
    const [login, error, signin, signout] = useAuth();
    let history = useHistory();
    return (
        <AppBar position="static" color="primary" sx={{ mb: 0.5 }}>
            <Container>
                <Toolbar>
                    <Logo />
                    <span style={{ flexGrow: 1 }} />
                    {login ? (
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <NavBar />
                            <span style={{ flexGrow: 1 }} />
                            {login.username}
                            <AccountBoxIcon />
                        </Box>
                    ) : (
                        ""
                    )}
                    <ButtonSignOut />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

// Exports
export default Header;
