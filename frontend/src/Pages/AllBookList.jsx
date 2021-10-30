import React, { useState, useEffect } from "react";
import { usePagedBookList, deleteCustomer } from "../Utils/accessHooks";
import BookList from "../Components/Books/BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button, ButtonGroup } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Authentication/ProvideAuth";
import LinearProgress from "@mui/material/LinearProgress";
import { filterContext } from "./Content";
import { useContext } from "react";

const AllBookList = () => {
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
                        deleteCustomer(id, login);
                        reload();
                    }}
                />
                <TablePagination
                    component="div"
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
                    labelRowsPerPage="Redova po stranici: "
                />
            </div>
        );
    }
};

export default AllBookList;
