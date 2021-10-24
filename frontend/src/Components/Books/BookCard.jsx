import { Link as RouterLink } from "react-router-dom";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImagePlaceholder from "./Components/ImagePlaceholder";
import Rating from "@mui/material/Rating";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStories";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import RemoveDoneRoundedIcon from "@mui/icons-material/RemoveDoneRounded";
import Link from "@mui/material/Link";

const BookCard = ({ bookData, onDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                // minWidth: 275,
                bgcolor: "card.light",
                height: 300,
                width: 300,
                m: 0.2,
                p: 0.2,
            }}
            color="text.secondary"
        >
            <CardContent>
                <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    #{bookData.id}
                </Typography>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                >
                    {bookData.title}
                </Typography>

                <ImagePlaceholder />
                <Box
                    sx={{
                        flexDirection: "row",
                    }}
                >
                    <Rating
                        name="read-only"
                        value={bookData.rating}
                        readOnly
                        size="small"
                    />
                    <AutoStoriesTwoToneIcon color="primary" fontSize="small" />
                    {bookData.pages}
                    {bookData.available ? (
                        <DoneAllRoundedIcon />
                    ) : (
                        <RemoveDoneRoundedIcon />
                    )}
                </Box>
                <Typography sx={{ fontSize: 10 }}>
                    ISBN: {bookData.isbn}
                </Typography>
                <Typography sx={{ fontSize: 10 }}>
                    Published: {bookData.publishDate}
                </Typography>
                <Typography sx={{ fontSize: 10 }}>
                    Genre: {bookData.genre}
                </Typography>
                <Box>
                    {bookData.authors.map((x) => (
                        <Link
                            component={RouterLink}
                            // to={`/books/${bookData.id}/view`}
                            to="#"
                            underline="always"
                            sx={{ fontSize: 10 }}
                        >
                            {x}
                        </Link>
                    ))}
                </Box>
                <React.Fragment>
                    <Button
                        component={RouterLink}
                        to={`/books/${bookData.id}/view`}
                        variant="contained"
                    >
                        view...
                    </Button>
                    <Button
                        component={RouterLink}
                        to={`/books/${bookData.id}/edit`}
                        variant="contained"
                    >
                        edit...
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => onDelete(bookData.id)}
                    >
                        delete
                    </Button>

                    {/* <Tooltip title="Delete">
                    <Typography>Authors</Typography>
                </Tooltip> */}
                </React.Fragment>
            </CardContent>
        </Card>
    );
};

export default BookCard;
