/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-26                                                          ║
║                                                                             ║
║  Render Sign Out button if user is loged in.                                ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../Authentication/ProvideAuth";

// Button element for log out. Visible when user is loged in.
const ButtonSignOut = () => {
    const [login, error, signin, signout] = useAuth();
    const history = useHistory();
    if (login) {
        return (
            <Button
                variant="contained"
                size="small"
                onClick={() => {
                    signout(() => history.push("/"));
                }}
            >
                Sign out
            </Button>
        );
    } else {
        return "";
    }
};

// Exports
export default ButtonSignOut;
