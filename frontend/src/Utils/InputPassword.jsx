import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Field, ErrorMessage } from "formik";

const InputPassword = ({ name, value }) => {
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        value = values.password;
    }, [values.password]);

    return (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
                Password
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? (
                                <VisibilityOff />
                            ) : (
                                <Visibility />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
        </FormControl>
    );
};

export default InputPassword;

const fieldName = "stars";

// const useZaposleni = (url) => {
//     const [zaposleni, setZaposleni] = useState([]);
//     useEffect(async () => {
//         try {
//             // fali ovde
//         } finally {
//             console.log("Gotovo!");
//         }
//         return () => {
//             console.log("Cleanup!");
//         };
//     }, [url]);

//     return zaposleni;
// };

// const FetchTest2 = (props) => {
//     const zaposleni = useZaposleni(props.url);
//     return (
//         <div>
//             {zaposleni.map((it) => (
//                 <span>
//                     {it.ime}
//                     <br />
//                 </span>
//             ))}
//         </div>
//     );
// };

// export { FetchTest2 };

const useCheckServer = (url) => {
    const [result, setResult] = useState([]);
    useEffect(async () => {
        try {
            let resp = await fetch(url);
            let data = await resp.json();
            setResult(true);
        } catch (err) {
            setResult(false);
        } finally {
        }
    }, [url]);

    return result;
};

const PingServer = () => {
    const resp = useCheckServer("http://localhost:3081/app/checkUsername/s");
    console.log(resp);
    return <div>{resp ? "Radi" : "Ne radi"}</div>;
};

// export { PingServer };
