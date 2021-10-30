/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-28                                                          ║
║                                                                             ║
║  Yup validation schemes                                                     ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import * as yup from "yup";
import { DateTime } from "luxon";
import { getMaxCount, userExists } from "../Utils/tools";

const signupSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username is to short. Length must be at least 3 character")
        .max(20, "Username is to long. Length must be 20 character or less")
        .test("is-unused", "${path} is not available", async (value) => {
            return !(await userExists(value));
        })
        .required("Username is required"),
    password: yup
        .string()
        .test(
            "is-upper",
            "Must contains at least 2 uppercase letters",
            (value) => /(?=(?:.*[A-Z]){2,})/.test(value)
        )
        .test(
            "is-lower",
            "Must contains at least 2 lowercase letters",
            (value) => /(?=(?:.*[a-z]){2,})/.test(value)
        )
        .test("is-number", "Must contains one digit", (value) =>
            /(?=(?:.*\d){1,})/.test(value)
        )
        .test("is-special", "Must contains one interpunction", (value) =>
            /(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})/.test(value)
        )
        .test("is-freq", "Letter occures too often", (value) => {
            if (value) {
                return getMaxCount(value) <= value.length / 4;
            } else {
                return false;
            }
        })
        .min(12, "Too Short! Minimum length is 12 characters")
        .required("Required"),
    passwordConfirm: yup
        .string()
        .required("Passwords is required")
        .test("passwords-match", "Password must match", function (value) {
            return this.parent.password === value;
        }),
});

const bookSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    title: yup
        .string()
        .required("Enter book name")
        .max(50, "Book title too long. Maximum 50 characters.")
        .ensure(),
    isbn: yup
        .number()
        .typeError("ISBN must be a number")
        .required("Enter ISBN number")
        .test("ISBN-length", "ISBN must have 12 digits", (num) =>
            /^(\d{12})$/.test(num)
        ),
    publishDate: yup
        .date()
        .max(DateTime.now(), "Date can not be in future")
        .typeError("Must be a date"),
    authors: yup
        .array()
        .of(yup.string().ensure().required("Enter authors"))
        .min(1, "Enter at least one author"),
    genre: yup.string().ensure().required("Enter genre"),
    pages: yup
        .number()
        .required("Enter number of pages")
        .positive("Must be positive number")
        .integer("Must be integer number"),

    available: yup.string().ensure().required("Enter available"),
    rating: yup
        .number()
        .required("Enter ranting from 1 to 5")
        .min(1, "Value must be at least 1")
        .max(5, "Value must be at most 5"),
});

// Exports
export { signupSchema, bookSchema };
