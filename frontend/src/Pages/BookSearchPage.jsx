/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-28                                                          ║
║                                                                             ║
║  Search page for books based on string. All atributes are taken into        ║
║  account                                                                    ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useState } from "react";
import { deleteBook, usePagedSearchBookList } from "../Utils/accessHooks";
import BookList from "../Components/Books/BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useAuth } from "../Authentication/ProvideAuth";
import { useParams, useHistory } from "react-router-dom";
import { filterContext } from "./Content";
import { useContext } from "react";
import LinearProgress from "@mui/material/LinearProgress";

// Component
const BookSearchPageParam = ({ initialQuery }) => {
    const [query, setQuery] = useState(initialQuery);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const history = useHistory();
    const [login] = useAuth();
    const { filter, setFilter } = useContext(filterContext);
    const [
        list,
        location,
        loading,
        error,
        pages,
        page,
        forward,
        back,
        goToPage,
        length,
        pageSize,
        setPageSize,
        reload,
    ] = usePagedSearchBookList(12, searchQuery, filter);

    const keyPress = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
            searchPress();
        }
    };

    const searchPress = (e) => {
        setSearchQuery(query);
        const location = {
            pathname: "/search/" + query,
            state: { fromDashboard: true },
        };
        history.replace(location);
    };

    if (loading) {
        return <LinearProgress />;
    } else {
        return (
            <div>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "centar",
                    }}
                >
                    <TextField
                        sx={{ flexGrow: 1, marginLeft: "18px" }}
                        margin="normal"
                        name="search"
                        label="Search"
                        value={query}
                        onChange={(e) => {
                            const val = e.target.value;
                            setQuery(val);
                        }}
                        onKeyDown={(e) => keyPress(e)}
                        variant="outlined"
                        size="small"
                    />
                    <Button
                        sx={{ mx: "20px", mb: "10px", mt: "15px" }}
                        variant="contained"
                        onClick={(e) => searchPress(e)}
                    >
                        Search
                    </Button>
                </Box>
                <BookList
                    list={list}
                    onDelete={(id) => {
                        deleteBook(id, login);
                        reload();
                    }}
                />
                <TablePagination
                    component="div"
                    showFirstButton
                    showLastButton
                    count={length}
                    page={page - 1}
                    onPageChange={(e, p) => goToPage(p)}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(e) => {
                        setPageSize(parseInt(e.target.value, 10));
                    }}
                    labelDisplayedRows={({ from, to, count, page }) =>
                        `${from}-${to} of ${count}`
                    }
                    rowsPerPageOptions={[12, 24, 48, 96]}
                    labelRowsPerPage="Rows per page:"
                />
            </div>
        );
    }
};

BookSearchPageParam.defaultProps = {
    initialQuery: "",
};

// Wrapper for url parameter
const BookSearchPage = () => {
    const { query } = useParams();
    return <BookSearchPageParam initialQuery={query} />;
};

// Exports
export default BookSearchPage;
