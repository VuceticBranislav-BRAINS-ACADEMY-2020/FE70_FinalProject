import { useAuth } from "../../Authentication/ProvideAuth";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { Formik } from "formik";
import { TextField } from "@mui/material";

const LogInBox = () => {
    const history = useHistory();
    const location = useLocation();
    const [login, error, signin, signout] = useAuth();

    let { from } = location.state || { from: { pathname: "/allbooks" } };
    return (
        <div className="loginBox">
            <h3>Login Forma</h3>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, { setSubmitting }) => {
                    signin(
                        values.username,
                        values.password,
                        () => {
                            setSubmitting(false);
                        },
                        () => {
                            history.replace(from);
                        }
                    );
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    validateField,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="username"
                            value={values.username}
                            label="Korisničko ime"
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="password"
                            value={values.password}
                            label="Lozinka"
                            onChange={handleChange}
                            type="password"
                        />
                        <br />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Log in
                        </Button>
                        <div>{error ? error : ""}</div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default LogInBox;
