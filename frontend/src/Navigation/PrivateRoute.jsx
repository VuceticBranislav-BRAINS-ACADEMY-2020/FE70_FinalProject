/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-26                                                          ║
║                                                                             ║
║  Privat ruter check is user loged in and allow routing if he is.            ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { useAuth } from "../Authentication/ProvideAuth";
import { Route, Redirect } from "react-router-dom";

// Component
const PrivateRoute = ({ children, ...rest }) => {
    const [login, error, signin, signout] = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (login) {
                    return children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

// Exports
export default PrivateRoute;
