/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-25                                                          ║
║                                                                             ║
║  Navigation bar containing buttons for adding new book, searching and       ║
║  filtering books.                                                           ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Select, MenuItem, Box } from "@mui/material";
import { filterContext } from "../Pages/Content";
import { useAuth } from "../Authentication/ProvideAuth";

// Component
const NavBar = () => {
    const [login, error, signin, signout] = useAuth();
    const { filter, setFilter } = useContext(filterContext);

    return login ? (
        <Box sx={{ minWidth: "100%" }}>
            <Button
                sx={{ minHeight: "20px", maxHeight: "20px", minWidth: "20%" }}
                size="small"
                component={RouterLink}
                to="/books/new"
                // variant="contained"
            >
                New Book
            </Button>
            <Button
                sx={{ minHeight: "20px", maxHeight: "20px", minWidth: "20%" }}
                size="small"
                component={RouterLink}
                to="/allbooks"
                // variant="contained"
            >
                All Books
            </Button>
            <Button
                sx={{ minHeight: "20px", maxHeight: "20px", minWidth: "20%" }}
                size="small"
                component={RouterLink}
                to="/search"
            >
                Search
            </Button>
            <Button
                sx={{ minHeight: "20px", maxHeight: "20px", minWidth: "20%" }}
                size="small"
                component={RouterLink}
                to="/searchauthor"
                // variant="outlined"
            >
                Search by Author
            </Button>
            <Select
                sx={{
                    minHeight: "20px",
                    maxHeight: "20px",
                    minWidth: "20%",
                }}
                variant="standard"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
            >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"Computing"}>Computing</MenuItem>
                <MenuItem value={"Mystery"}>Mystery</MenuItem>
                <MenuItem value={"Horror"}>Horror</MenuItem>
            </Select>
        </Box>
    ) : (
        ""
    );
};

// Exports
export default NavBar;
