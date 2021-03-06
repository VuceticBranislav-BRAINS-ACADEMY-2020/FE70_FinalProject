/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-28                                                          ║
║                                                                             ║
║  List of all books to display                                               ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import BookCard from "./BookCard";
import Box from "@mui/material/Box";

// Component
const BookList = ({ list, onDelete }) => {
    return (
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
                    key={row.id.toString()}
                    bookData={row}
                    onDelete={onDelete}
                />
            ))}
        </Box>
    );
};

// Exports
export default BookList;
