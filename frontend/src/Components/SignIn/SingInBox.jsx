/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-22                                                          ║
║                                                                             ║
║  Render Sign In box with username, password, confirm password and submit    ║
║  button. Box use formix in combination with MUI components. On successful   ║
║  submit it redirects to log in page.                                        ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import {
    Button,
    LinearProgress,
    Typography,
    Box,
    TextField,
} from "@mui/material";
import { useRegister } from "../../Authentication/ProvideRegister";
import { signupSchema } from "../../Utils/validationTools";
import { setMeter } from "../../Utils/tools";

// Component
const SingInBox = () => {
    const history = useHistory();
    const location = useLocation();
    const [signin, error, register] = useRegister();
    const [meterValue, setMeterValue] = useState(0);
    const [ready, setReady] = useState(false);

    let { from } = location.state || { from: { pathname: "/login" } };
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography mt={2} fontSize="large" textAlign="center">
                Sign In
            </Typography>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                    passwordConfirm: "",
                }}
                validationSchema={signupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    register(
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
                    isValidating,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="username"
                            value={values.username}
                            label="Username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            sx={{ mt: 1 }}
                            suggested="enter-username"
                            error={touched.username && Boolean(errors.username)}
                        />
                        <Typography
                            textAlign="center"
                            color="red"
                            fontSize="small"
                        >
                            {touched.username && Boolean(errors.username)
                                ? errors.username
                                : ""}
                        </Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            name="password"
                            value={values.password}
                            label="Password"
                            onChange={(e) => {
                                setFieldValue("password", e.target.value);
                                setFieldTouched("password", true, true);
                                validateField("password");
                                setMeter(
                                    e.target.value,
                                    values.passwordConfirm,
                                    setReady,
                                    setMeterValue
                                );
                                setFieldValue("isSubmitting", ready);
                            }}
                            onBlur={handleBlur}
                            type="password"
                            sx={{ mt: 1 }}
                            suggested="enter-password"
                            error={touched.password && Boolean(errors.password)}
                        />
                        <Typography
                            textAlign="center"
                            color="red"
                            fontSize="small"
                        >
                            {touched.password && Boolean(errors.password)
                                ? errors.password
                                : ""}
                        </Typography>

                        <TextField
                            fullWidth
                            variant="outlined"
                            name="passwordConfirm"
                            value={values.passwordConfirm}
                            label="Password Confirm"
                            sx={{ mt: 1 }}
                            onChange={(e) => {
                                setFieldValue(
                                    "passwordConfirm",
                                    e.target.value
                                );
                                setFieldTouched("passwordConfirm", true, true);
                                validateField("passwordConfirm");
                                setMeter(
                                    values.password,
                                    e.target.value,
                                    setReady,
                                    setMeterValue
                                );
                                setFieldValue("isSubmitting", ready);
                            }}
                            onBlur={handleBlur}
                            type="password"
                            suggested="repeat-password"
                            error={
                                touched.passwordConfirm &&
                                Boolean(errors.passwordConfirm)
                            }
                        />
                        <Typography
                            textAlign="center"
                            color="red"
                            fontSize="small"
                        >
                            {touched.passwordConfirm &&
                            Boolean(errors.passwordConfirm)
                                ? errors.passwordConfirm
                                : ""}
                        </Typography>

                        <LinearProgress
                            variant="determinate"
                            color={meterValue < 4 ? "error" : "success"}
                            value={meterValue * 20}
                            sx={{ mt: 1 }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 1 }}
                            disabled={
                                isSubmitting ||
                                !ready ||
                                !touched.username ||
                                Boolean(errors.username)
                            }
                        >
                            Sign in
                        </Button>
                        <Typography
                            textAlign="center"
                            color="red"
                            fontSize="small"
                        >
                            {error ? error : ""}
                        </Typography>

                        <Typography
                            mt="20px"
                            textAlign="center"
                            fontStyle="italic"
                            fontSize="small"
                        >
                            Password must have at least 4 of 5 rules.
                            <br />
                            1. Two uppercase caracter
                            <br />
                            2. Two lovercase character
                            <br />
                            3. One special character
                            <br />
                            4. One digit
                            <br />
                            5. Minimum length od 12 characters
                            <br />
                            Additionally to this rules no one character can have
                            occurace grater
                            <br />
                            then 25% of all characters.
                        </Typography>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

// Exports
export default SingInBox;
