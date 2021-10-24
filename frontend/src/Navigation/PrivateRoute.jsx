import { useAuth } from "../Authentication/ProvideAuth";
import { Route, Redirect } from "react-router-dom";

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

export default PrivateRoute;
