import React from "react";
import BookCard from "./BookCard";
import Box from "@mui/material/Box";

const BookList = ({ list, onDelete }) => {
    return (
        // <div style={{ display: "flex", flexDirection: "row" }}>
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {list.map((row) => (
                <BookCard
                    key={row.toString()}
                    bookData={row}
                    onDelete={onDelete}
                />
            ))}
        </Box>
        //  </div>
    );
};

export default BookList;
