// import h from "./Resources/Horror.jpg";
import React from "react";
import { useFetch } from "react-async";
import { Paper, Typography, Box } from "@mui/material";

// const checkGenre = (genre) => {
//     if (genre === "Science Fiction") {
//         return sf;
//     } else if (genre === "Fantasy") {
//         return f;
//     } else if (genre === "Computing") {
//         return c;
//     } else if (genre === "Mystery") {
//         return m;
//     } else if (genre === "Horror") {
//         return h;
//     } else {
//         return books;
//     }
// };

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

const setMeter = (
    pass1,
    pass2,
    setReady = (ready) => {},
    setMeterValue = (points) => {}
) => {
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

export { setMeter };
