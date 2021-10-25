/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-22                                                          ║
║                                                                             ║
║  Container located between header and footer. All page content should go    ║
║  here. Component is formated as flex.                                       ║
║  Content also provides context for selected genre.                          ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useState } from "react";
import { Box } from "@mui/material";

// Create context
// Parameters:
//   filter - Curently selected genre. Should have one of following values:
//            "All", "Science Fiction", "Fantasy", "Computing",
//            "Mystery", "Horror".
// Default value: "All"
const filterContext = React.createContext({
    filter: "All",
    setFilter: () => {},
});

// Content component with context and formating.
const Content = ({ children, ...rest }) => {
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
                    flexWrap: "wrap",
                    alignItems: "center",
                    bgcolor: "background.default",
                    color: "text.primary",
                }}
            >
                {children}
            </Box>
        </filterContext.Provider>
    );
};

// Exports
export default Content;
export { filterContext };
