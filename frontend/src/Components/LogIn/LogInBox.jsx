/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-22                                                          ║
║                                                                             ║
║  Render Log In box with username, password and submit button. Box use       ║
║  formix in combination with MUI components. On successful submit            ║
║  it redirects to page with all books.                                       ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { useHistory, useLocation } from "react-router-dom";
import { Button, TextField, Typography, Box } from "@mui/material";
import { Formik } from "formik";
import { useAuth } from "../../Authentication/ProvideAuth";

// Component
const LogInBox = () => {
    const history = useHistory();
    const location = useLocation();
    const [login, error, signin, signout] = useAuth();

    let { from } = location.state || { from: { pathname: "/allbooks" } };
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography mt={2} fontSize="large" textAlign="center">
                Log In
            </Typography>
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
                            label="Username"
                            onChange={handleChange}
                            sx={{ mt: 1 }}
                            suggested="new-password"
                            error={touched.username && Boolean(errors.username)}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="password"
                            value={values.password}
                            label="Password"
                            onChange={handleChange}
                            type="password"
                            sx={{ mt: 1 }}
                            suggested="new-password"
                            error={touched.password && Boolean(errors.password)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{ mt: 1 }}
                        >
                            Log in
                        </Button>
                        <Typography
                            textAlign="center"
                            color="red"
                            fontSize="small"
                        >
                            {error ? error : ""}
                        </Typography>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Exports
export default LogInBox;
