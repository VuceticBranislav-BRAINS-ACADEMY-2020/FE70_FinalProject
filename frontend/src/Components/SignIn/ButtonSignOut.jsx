import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

import { useAuth } from "../../Authentication/ProvideAuth";

const ButtonSignOut = () => {
    const [login, error, signin, signout] = useAuth();
    const history = useHistory();
    if (login) {
        return (
            <Button
                variant="contained"
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

export default ButtonSignOut;
