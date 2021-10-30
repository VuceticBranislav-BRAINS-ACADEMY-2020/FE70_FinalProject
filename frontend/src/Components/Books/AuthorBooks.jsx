import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useBooksByAuthorList } from "../../Utils/accessHooks";
import { filterContext } from "../../Pages/Content";
import { useContext } from "react";
import {
    List,
    ListItem,
    LinearProgress,
    Link,
    Paper,
    InputLabel,
} from "@mui/material";

const AuthorBooks = ({ authors }) => {
    const [list, loading] = useBooksByAuthorList(authors);

    if (loading) {
        return <LinearProgress />;
    } else {
        return (
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    p: 0.5,
                    my: 0.5,
                    mx: 1,
                    width: "280px",
                    maxWidth: "280px",
                }}
            >
                <InputLabel sx={{ fontSize: "0.8rem" }}>
                    List of Book from Authors:
                </InputLabel>
                <List dense="true" sx={{ overflow: "auto", maxHeight: 200 }}>
                    {list.map((x, id) => (
                        <ListItem key={id.toString()}>
                            <Link
                                key={id.toString()}
                                component={RouterLink}
                                to={`/search/${x.title}`}
                                underline="hover"
                                sx={{ fontSize: 14, m: -0.5 }}
                            >
                                {x.title}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
};

export default AuthorBooks;
