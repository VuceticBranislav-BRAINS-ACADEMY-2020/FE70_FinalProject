import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { useAuth } from "../Authentication/ProvideAuth";
import ButtonSignOut from "../Components/SignIn/ButtonSignOut";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import NavBar from "./NavBar";

const Footer = () => {
    const [login, error, signin, signout] = useAuth();

    // function LinkTab(props) {
    //     return (
    //         <Tab
    //             component="a"
    //             onClick={(event) => {
    //                 event.preventDefault();
    //             }}
    //             {...props}
    //         />
    //     );
    // }

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="md">
                <Toolbar>
                    {/* <Avatar src={logo} /> */}
                    <BlurOnIcon />
                    <Typography variant="body1" color="inherit">
                        CHUDO NEVIDJENO !
                    </Typography>
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

export default Footer;
