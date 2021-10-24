import * as yup from "yup";
import { DateTime } from "luxon";

const userExists = async (username) => {
    return await fetch("http://localhost:3081/app/checkUsername/" + username, {
        method: "GET",
    })
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

// duplicated
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

export const signupSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username is to short. Length must be at least 3 character.")
        .max(20, "Username is to long. Length must be 20 character or less.")
        .test("is-unused", "${path} is not avalible", async (value) => {
            return !(await userExists(value));
        })
        .required("Username is required."),
    password: yup
        .string()
        .test(
            "is-upper",
            "Must contains at least 2 uppercase letters.",
            (value) => /(?=(?:.*[A-Z]){2,})/.test(value)
        )
        .test(
            "is-lower",
            "Must contains at least 2 lowercase letters.",
            (value) => /(?=(?:.*[a-z]){2,})/.test(value)
        )
        .test("is-number", "Must contains one digit.", (value) =>
            /(?=(?:.*\d){1,})/.test(value)
        )
        .test("is-special", "Must contains one interpunction.", (value) =>
            /(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})/.test(value)
        )
        .test("is-freq", "Letter occures too often.", (value) => {
            if (value) {
                return getMaxCount(value) <= value.length / 4;
            } else {
                return false;
            }
        })
        .min(12, "Too Short! Minimum length is 12 characters.")
        .required("Required"),
    repeatPass: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const customerYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    title: yup.string().ensure().required("Mora se uneti title"),
    isbn: yup.string().ensure().required("Mora se uneti isbn"),
    publishDate: yup
        .date()
        // .max(DateTime.now(), "Ne može datum skoriji od danas")
        .required("Mora se uneti"),
    authors: yup
        .array()
        .of(yup.string().ensure().required("Mora se uneti autor")),
    genre: yup.string().ensure().required("Mora se uneti genre"),
    pages: yup.string().ensure().required("Mora se uneti pages"),
    // available: yup.string().ensure().required("Mora se uneti available"),
    rating: yup.string().ensure().required("Mora se uneti available"),
});

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
};
