import { useAuth } from "../../Authentication/ProvideAuth";
import { useUsers } from "../../Authentication/ProvideUsers";
import { useHistory, useLocation } from "react-router-dom";
import { Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/material";
import { Formik, ErrorMessage } from "formik";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Form } from "formik";
import { signupSchema } from "../../Utils/validationTools";

const SingInBox = () => {
    const history = useHistory();
    const location = useLocation();
    const [login, error, signin, signout] = useAuth();
    const [login2, error2, signin2] = useUsers();

    const [meterValue, setMeterValue] = useState(0);
    const [ready, setReady] = useState(false);
    const [readyUser, setReadyUser] = useState(false);

    const onChange1 = (e, pass2, setFieldValue) => {
        setFieldValue("password", e.target.value);
        setMeter(e.target.value, pass2);
        setFieldValue("isSubmitting", ready);
    };

    const onChange2 = (e, pass1, setFieldValue) => {
        setFieldValue("repeatPass", e.target.value);
        setMeter(pass1, e.target.value);
        setFieldValue("isSubmitting", ready);
    };

    const onChange3 = async (e, setFieldValue) => {
        setFieldValue("username", e.target.value);
        setReadyUser(await userExists(e.target.value));
        setFieldValue("isSubmitting", readyUser);
    };

    const userExists = async (username) => {
        // duplicated
        return await fetch(
            "http://localhost:3081/app/checkUsername/" + username,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "ok") {
                    return false;
                } else {
                    return data.body;
                }
            })
            .catch((err) => {
                return false;
            });
    };

    function commonSameCount(s1, s2) {
        var s1Array = s1.split("");
        var s2Array = s2.split("");
        var count = 0;
        let index = 0;

        s1Array.filter((s1) => {
            index = s2Array.findIndex((s2) => s2 == s1);
            if (index == 0) {
                count++;
                s2Array.splice(index, 1);
            }
        });
        return count;
    }

    function getMaxCount(str) {
        var Obj = {}; //Define an empty object
        for (let i = 0; i < str.length; i++) {
            if (Obj[str.charAt(i)]) {
                Obj[str.charAt(i)]++;
            } else {
                Obj[str.charAt(i)] = 1;
            }
        }
        let num = 0;
        let char = "";
        for (var key in Obj) {
            if (Obj[key] > num) {
                num = Obj[key];
                char = key;
            }
        }
        return num;
    }

    const setMeter = (pass1, pass2) => {
        // Is valid
        let r = pass1 === pass2;
        if (pass1 === "" || pass2 === "") r = false;

        // Strength
        let points = 0;
        if (/(?=(?:.*[A-Z]){2,})/.test(pass1)) points++;
        if (/(?=(?:.*[a-z]){2,})/.test(pass1)) points++;
        if (/(?=(?:.*\d){1,})/.test(pass1)) points++;
        if (pass1.length >= 12) points++;
        if (/(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})/.test(pass1)) points++;
        if (points < 4) r = false; // 60% of 5
        if (getMaxCount(pass1) > pass1.length / 4) r = false;

        setReady(r);
        setMeterValue(points);
    };

    let { from } = location.state || { from: { pathname: "/login" } };
    return (
        <Box>
            <h3>Sign In Forma</h3>
            <Formik
                initialValues={{ username: "", password: "", repeatPass: "" }}
                validationSchema={signupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    signin2(
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
                            label="Korisničko ime"
                            // onChange={handleChange}
                            // onBlur={(e) => onChange3(e, setFieldValue)}
                            onChange={(e) => onChange3(e, setFieldValue)}
                            onBlur={handleBlur}
                        />
                        <ErrorMessage component="div" name="username" />
                        <br />
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="password"
                            value={values.password}
                            label="Password"
                            onChange={(e) =>
                                onChange1(e, values.repeatPass, setFieldValue)
                            }
                            onBlur={handleBlur}
                            type="password"
                        />
                        {/* <ErrorMessage component="div" name="password" /> */}
                        {touched.password && errors.password && (
                            <div>{errors.password}</div>
                        )}
                        <br />
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="repeatPass"
                            value={values.repeatPass}
                            label="Repeat Password"
                            onChange={(e) =>
                                onChange2(e, values.password, setFieldValue)
                            }
                            onBlur={handleBlur}
                            type="password"
                        />
                        <ErrorMessage component="div" name="repeatPass" />
                        <br />
                        <LinearProgress
                            variant="determinate"
                            color={meterValue < 4 ? "error" : "success"}
                            value={meterValue * 20}
                        />
                        <br />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting || !ready || readyUser}
                        >
                            Sign in
                        </Button>
                        <div>{error ? error : ""}</div>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default SingInBox;
