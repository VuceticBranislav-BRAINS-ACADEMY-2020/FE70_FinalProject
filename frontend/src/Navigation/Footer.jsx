import { AppBar } from "@mui/material";
import { Container } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

const Footer = () => {
    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant="body1" color="inherit">
                        © 2021 Test
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Footer;
