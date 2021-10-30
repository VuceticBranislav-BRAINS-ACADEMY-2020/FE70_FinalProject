/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-28                                                          ║
║                                                                             ║
║  Open detail page for one book                                              ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useCustomer, updateCustomer } from "../Utils/accessHooks";
import BookDetail from "../Components/Books/BookDetail";
import { useAuth } from "../Authentication/ProvideAuth";

// Component
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

// Exports
export default BookDetailPage;
