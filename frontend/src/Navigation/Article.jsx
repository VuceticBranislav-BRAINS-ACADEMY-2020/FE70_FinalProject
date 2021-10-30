/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-26                                                          ║
║                                                                             ║
║  Container between header  and footer.                                      ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import { Box } from "@mui/material";

// Component
const Article = ({ children, ...rest }) => {
    return (
        <Box flex="1" sx={{ minWidth: "100%" }}>
            {children}
        </Box>
    );
};

// Exports
export default Article;
