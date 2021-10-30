/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-26                                                          ║
║                                                                             ║
║  Display all information about one book in form of card.                    ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { Link as RouterLink } from "react-router-dom";
import React, { useReducer } from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import ImagePlaceholder from "./Components/ImagePlaceholder";
import Rating from "@mui/material/Rating";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStories";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import RemoveDoneRoundedIcon from "@mui/icons-material/RemoveDoneRounded";
import Link from "@mui/material/Link";

// Book component display all information on card
const BookCard = ({ bookData, onDelete }) => {
    let authorList = bookData.authors.join(", ");
    return (
        <Card
            variant="outlined"
            sx={{
                height: 300,
                width: 300,
                m: 0.2,
                p: 1,
                boxSizing: "border-box",
                //  bgcolor: "primary.main",
            }}
        >
            <Typography sx={{ fontSize: 12 }}>#{bookData.id}</Typography>

            <Box style={{ flexGrow: 1 }} />

            <Typography
                sx={{
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 16,
                }}
                fontStyle="bold"
                textAlign="center"
            >
                {bookData.title}
            </Typography>

            <ImagePlaceholder genre={bookData.genre} />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Rating name="read-only" value={bookData.rating} readOnly />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        userSelect: "none",
                    }}
                >
                    <AutoStoriesTwoToneIcon color="primary" fontSize="small" />
                    &#160;{bookData.pages}
                </Box>
                {bookData.available ? (
                    <DoneAllRoundedIcon color="success" />
                ) : (
                    <RemoveDoneRoundedIcon color="error" />
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 12,
                    mb: 0.7,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 12,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    By: {authorList}
                </Typography>
            </Box>

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Box>
                    <Typography sx={{ fontSize: 12 }}>
                        Genre: {bookData.genre}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                        Published: {bookData.publishDate}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                        ISBN: {bookData.isbn}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                    }}
                >
                    <IconButton
                        color="primary"
                        component={RouterLink}
                        to={`/books/${bookData.id}/view`}
                        sx={{
                            m: 0,
                        }}
                    >
                        <InfoIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                        color="primary"
                        component={RouterLink}
                        to={`/books/${bookData.id}/edit`}
                        sx={{
                            m: 0,
                        }}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={() => onDelete(bookData.id)}
                        sx={{
                            m: 0,
                        }}
                    >
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
};

export default BookCard;
