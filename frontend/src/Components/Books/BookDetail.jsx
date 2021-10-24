import React, { useState } from "react";
import { Formik, Form } from "formik";
// import './CustomerDetails.css';
import { customerYupSchema, toStandardTime } from "../../Utils/validationTools";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { useHistory } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Switch from "@mui/material/Switch";
import ImagePlaceholder from "./Components/ImagePlaceholder";
import AuthorBooks from "./AuthorBooks";
import ChipsArray from "./Components/ChipsArray";

const BookDetail = ({ startingMode, customer, action }) => {
    const [mode, setMode] = useState(startingMode);
    const history = useHistory();
    let message = "";
    let inputProperties = {};
    let hideID = false;
    if (mode === "view") {
        message = `Pregled ${customer.title}`;
        inputProperties = { readOnly: true };
    } else if (mode === "edit") {
        message = `Izmena ${customer.title}`;
    } else if (mode === "create") {
        message = "Kreiranje nove knjige";
        hideID = true;
    }

    return (
        <div className="formContent">
            <h3>{message}</h3>
            <Formik
                initialValues={customer}
                validationSchema={customerYupSchema}
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
                        {hideID || (
                            <TextField
                                fullWidth
                                margin="normal"
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
                        )}
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
                        {/* <br />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="authors"
                            label="Autori:"
                            value={
                                values.authors === ""
                                    ? ""
                                    : values.authors.join("\n")
                            }
                            onChange={(e) => onChange555(e, setFieldValue)}
                            onBlur={handleBlur}
                            error={touched.authors && Boolean(errors.authors)}
                            helperText={touched.authors && errors.authors}
                            multiline
                            maxRows={4}
                            variant="outlined"
                            InputProps={inputProperties}
                        /> */}
                        <ChipsArray
                            items={values.authors}
                            InputProps={inputProperties}
                            fieldSetter={setFieldValue}
                        ></ChipsArray>

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
                            error={touched.pages && Boolean(errors.pages)}
                            helperText={touched.pages && errors.pages}
                            variant="outlined"
                            InputProps={inputProperties}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            margin="normal"
                            name="rating"
                            label="Rating"
                            value={values.rating}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.rating && Boolean(errors.rating)}
                            helperText={touched.rating && errors.rating}
                            variant="outlined"
                            InputProps={inputProperties}
                        />
                        <InputLabel id="genreL">Genre</InputLabel>
                        <Select
                            margin="normal"
                            labelId="genreL"
                            id="genre"
                            name="genre"
                            value={values.genre}
                            label="Genre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputProps={inputProperties}
                            variant="outlined"
                            error={touched.genre && Boolean(errors.genre)}
                            helperText={touched.genre && errors.genre}
                        >
                            <MenuItem value={"Science Fiction"}>
                                Science Fiction
                            </MenuItem>
                            <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                            <MenuItem value={"Computing"}>Computing</MenuItem>
                            <MenuItem value={"Mystery"}>Mystery</MenuItem>
                            <MenuItem value={"Horror"}>Horror</MenuItem>
                        </Select>
                        <br />
                        <ImagePlaceholder />
                        <br />
                        <Switch
                            variant="outlined"
                            margin="normal"
                            name="available"
                            label="Available"
                            value={values.available}
                            checked={values.available}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                                touched.available && Boolean(errors.available)
                            }
                            helperText={touched.available && errors.available}
                            InputProps={inputProperties}
                            disabled={inputProperties.readOnly}
                        />
                        <br />
                        <DatePicker
                            margin="normal"
                            name="publishDate"
                            label="Datum izdavanja kljige:"
                            value={values.publishDate}
                            readOnly={inputProperties.readOnly}
                            onChange={(e) => {
                                setFieldValue("publishDate", toStandardTime(e));
                                setFieldTouched("publishDate", true, true);
                                validateField("publishDate");
                            }}
                            onBlur={handleBlur}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <span>
                            {touched.publishDate && Boolean(errors.publishDate)
                                ? errors.publishDate
                                : ""}
                        </span>

                        {mode === "view" ? (
                            <AuthorBooks authors={values.authors}></AuthorBooks>
                        ) : (
                            <Button
                                disabled={isSubmitting}
                                color="primary"
                                variant="contained"
                                fullWidth
                                type="submit"
                            >
                                Snimi
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
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

export default BookDetail;
