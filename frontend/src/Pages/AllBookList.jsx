import React, { useState, useEffect } from "react";
import { usePagedBookList, deleteCustomer } from "../Utils/accessHooks";
import BookList from "../Components/Books/BookList";
import TablePagination from "@mui/material/TablePagination";
import { Button, ButtonGroup } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Authentication/ProvideAuth";

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
    ] = usePagedBookList(10, filter);
    const [login] = useAuth();

    if (loading) {
        return <h3>Loading...</h3>;
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
                        `Prikazujem stranicu ${
                            page + 1
                        } (${from}-${to} od ukupno ${count})`
                    }
                    labelRowsPerPage="Redova po stranici: "
                />
            </div>
        );
    }
};

export default AllBookList;
