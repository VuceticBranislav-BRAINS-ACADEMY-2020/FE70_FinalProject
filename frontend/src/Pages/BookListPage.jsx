/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-28                                                          ║
║                                                                             ║
║  Page that display all books                                                ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { usePagedBookList, deleteBook } from "../Utils/accessHooks";
import BookList from "../Components/Books/BookList";
import TablePagination from "@mui/material/TablePagination";
import { useAuth } from "../Authentication/ProvideAuth";
import LinearProgress from "@mui/material/LinearProgress";
import { filterContext } from "./Content";
import { useContext } from "react";

// Component
const BookListPage = () => {
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
    ] = usePagedBookList(12, filter);
    const [login] = useAuth();
    if (loading) {
        return <LinearProgress />;
    } else {
        return (
            <div>
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
                    labelRowsPerPage="Rows per page: "
                />
            </div>
        );
    }
};

// Exports
export default BookListPage;
