/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-30                                                          ║
║                                                                             ║
║  Image to represent book genre.                                             ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import imgHorror from "../../../Resources/Horror.jpg";
import imgComputing from "../../../Resources/Computing.jpg";
import imgFantasy from "../../../Resources/Fantasy.jpg";
import imgMystery from "../../../Resources/Mystery.jpg";
import imgSF from "../../../Resources/SF.jpg";
import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";

// Component
const ImagePlaceholder = ({ genre }) => {
    let img = "";
    switch (genre) {
        case "Horror":
            img = imgHorror;
            break;
        case "Computing":
            img = imgComputing;
            break;
        case "Fantasy":
            img = imgFantasy;
            break;
        case "Mystery":
            img = imgMystery;
            break;
        case "Science Fiction":
            img = imgSF;
            break;
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="stretch"
        >
            <CardMedia
                component="img"
                height="150"
                width="280"
                image={img}
                alt="image"
            />
        </Box>
    );
};

// Exports
export default ImagePlaceholder;
