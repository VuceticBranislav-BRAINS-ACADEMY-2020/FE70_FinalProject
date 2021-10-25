/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-22                                                          ║
║                                                                             ║
║  Render LogIn button if user is not loged in.                               ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../Authentication/ProvideAuth";

// Button element for log in. Visible when user is not loged in.
const ButtonLogIn = () => {
    const [login, error, signin, signout] = useAuth();

    if (login) {
        return "";
    } else {
        return (
            <Button variant="contained" component={RouterLink} to="/login">
                Log in
            </Button>
        );
    }
};

// Exports
export default ButtonLogIn;
