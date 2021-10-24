import { Link as RouterLink, useHistory } from "react-router-dom";
import { Button } from "@mui/material";

import { useAuth } from "../../Authentication/ProvideAuth";

const ButtonLogIn = () => {
    const [login, error, signin, signout] = useAuth();
    const history = useHistory();
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

export default ButtonLogIn;
