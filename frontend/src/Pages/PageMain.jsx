import React, { useState, useContext, createContext } from "react";
import { Box } from "@mui/material";

const filterContext = React.createContext({
    filter: "All",
    setFilter: () => {},
});

const PageMain = ({ children, ...rest }) => {
    const [filter, setFilter] = useState("All");
    const valueFilter = { filter, setFilter };
    return (
        <filterContext.Provider value={valueFilter}>
            <Box
                sx={{
                    margin: "0px",
                    padding: "0px",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                }}
            >
                {children}
            </Box>
        </filterContext.Provider>
    );
};

export default PageMain;
export { filterContext };
