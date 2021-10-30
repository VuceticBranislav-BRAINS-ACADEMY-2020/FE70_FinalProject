/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-29                                                          ║
║                                                                             ║
║  Book detail page. This page is used for adding new book as well as edit    ║
║  existing one.                                                              ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import {
    Typography,
    Box,
    FormControlLabel,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Checkbox,
    Switch,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { bookSchema, toStandardTime } from "../../Utils/validationTools";
import AuthorBooks from "./AuthorBooks";
import ChipsArray from "./Components/ChipsArray";

// Component
const BookDetail = ({ startingMode, customer, action }) => {
    const [mode, setMode] = useState(startingMode);
    const history = useHistory();
    let message = "";
    let inputProperties = {};
    let hideID = false;
    if (mode === "view") {
        message = `View: ${customer.title}`;
        inputProperties = { readOnly: true };
    } else if (mode === "edit") {
        message = `Edit: ${customer.title}`;
    } else if (mode === "create") {
        message = "Add new book";
        hideID = true;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
                sx={{ mt: 5, textAlign: "center" }}
                variant="h5"
                color="primary"
            >
                {message}
            </Typography>

            <Formik
                initialValues={customer}
                validationSchema={bookSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const rez = action(values);
                    setSubmitting(false);
                    history.go(-1);
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
                    <Form onSubmit={handleSubmit}>
                        {/* {hideID || (
                            <TextField
                                fullWidth
                                margin="dense"
                                name="id"
                                label="Id"
                                value={values.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.id && Boolean(errors.id)}
                                helperText={touched.id && errors.id}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        )} */}

                        <TextField
                            fullWidth
                            margin="normal"
                            name="title"
                            label="Title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            variant="outlined"
                            InputProps={inputProperties}
                        />
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Box display="flex" flexDirection="column">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    name="isbn"
                                    label="ISBN"
                                    value={values.isbn}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.isbn && Boolean(errors.isbn)}
                                    helperText={touched.isbn && errors.isbn}
                                    variant="outlined"
                                    InputProps={inputProperties}
                                />

                                <TextField
                                    fullWidth
                                    type="number"
                                    margin="normal"
                                    name="pages"
                                    label="Pages"
                                    value={values.pages}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.pages && Boolean(errors.pages)
                                    }
                                    helperText={touched.pages && errors.pages}
                                    variant="outlined"
                                    InputProps={inputProperties}
                                />
                                <TextField
                                    fullWidth
                                    type="number"
                                    margin="dense"
                                    name="rating"
                                    label="Rating"
                                    sx={{ mb: "12px" }}
                                    value={values.rating}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={
                                        touched.rating && Boolean(errors.rating)
                                    }
                                    helperText={touched.rating && errors.rating}
                                    variant="outlined"
                                    InputProps={inputProperties}
                                />

                                <InputLabel
                                    id="demo-simple-select-label"
                                    sx={{ fontSize: "0.8rem" }}
                                >
                                    Genre
                                </InputLabel>
                                <Select
                                    // margin="normal"
                                    fullWidth
                                    labelId="genreL"
                                    id="demo-simple-select-label"
                                    name="genre"
                                    value={values.genre}
                                    label="Genre"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    InputProps={inputProperties}
                                    variant="outlined"
                                    error={
                                        touched.genre && Boolean(errors.genre)
                                    }
                                    // helperText={touched.genre && errors.genre}
                                >
                                    <MenuItem value={"Science Fiction"}>
                                        Science Fiction
                                    </MenuItem>
                                    <MenuItem value={"Fantasy"}>
                                        Fantasy
                                    </MenuItem>
                                    <MenuItem value={"Computing"}>
                                        Computing
                                    </MenuItem>
                                    <MenuItem value={"Mystery"}>
                                        Mystery
                                    </MenuItem>
                                    <MenuItem value={"Horror"}>Horror</MenuItem>
                                </Select>
                                <br />
                                <DatePicker
                                    margin="normal"
                                    name="publishDate"
                                    label="Release date:"
                                    value={values.publishDate}
                                    readOnly={inputProperties.readOnly}
                                    onChange={(e) => {
                                        setFieldValue(
                                            "publishDate",
                                            toStandardTime(e)
                                        );
                                        setFieldTouched(
                                            "publishDate",
                                            true,
                                            true
                                        );
                                        validateField("publishDate");
                                    }}
                                    onBlur={handleBlur}
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                                <span>
                                    {touched.publishDate &&
                                    Boolean(errors.publishDate)
                                        ? errors.publishDate
                                        : ""}
                                </span>

                                <FormControlLabel
                                    control={
                                        <Switch
                                            variant="outlined"
                                            margin="normal"
                                            name="available"
                                            value={values.available}
                                            checked={values.available}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                touched.available &&
                                                Boolean(errors.available)
                                            }
                                            // helperText={touched.available && errors.available}
                                            InputProps={inputProperties}
                                            disabled={inputProperties.readOnly}
                                        />
                                    }
                                    label="Available"
                                />
                            </Box>

                            <Box display="flex" flexDirection="column">
                                <ChipsArray
                                    items={values.authors}
                                    InputProps={inputProperties}
                                    fieldSetter={setFieldValue}
                                ></ChipsArray>
                                {mode === "view" ? (
                                    <AuthorBooks
                                        authors={values.authors}
                                    ></AuthorBooks>
                                ) : (
                                    ""
                                )}
                            </Box>
                        </Box>

                        {mode === "view" ? (
                            ""
                        ) : (
                            <Button
                                disabled={isSubmitting}
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{ mt: "12px" }}
                            >
                                Snimi
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

BookDetail.defaultProps = {
    customer: {
        id: null,
        title: "",
        isbn: "",
        publishDate: "",
        authors: [],
        available: "",
        genre: "Science Fiction",
        pages: 0,
        rating: 0,
    },
    startingMode: "view",
};

// Exports
export default BookDetail;
