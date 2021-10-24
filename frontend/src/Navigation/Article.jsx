import { Box } from "@mui/material";

const Article = ({ children, ...rest }) => {
    return (
        <Box
            sx={{
                // margin: "0px",
                // padding: "0px",
                flex: "1",
            }}
        >
            {children}
        </Box>
    );
};

export default Article;
