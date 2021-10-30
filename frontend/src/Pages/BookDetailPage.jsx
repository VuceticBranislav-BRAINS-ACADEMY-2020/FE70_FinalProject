import React from "react";
import { useParams } from "react-router-dom";
import { useCustomer, updateCustomer } from "../Utils/accessHooks";
import BookDetail from "../Components/Books/BookDetail";
import { useAuth } from "../Authentication/ProvideAuth";
import { LinearProgress } from "@mui/material";

const BookDetailPage = () => {
    const { cid, operation } = useParams();
    const [customer, loading] = useCustomer(cid);
    const [login] = useAuth();
    if (loading) {
        return <LinearProgress />;
    } else {
        return (
            <BookDetail
                customer={customer}
                startingMode={operation}
                action={
                    operation === "edit"
                        ? (customer) => updateCustomer(customer, login)
                        : undefined
                }
            />
        );
    }
};

export default BookDetailPage;
