import React from "react";
import { ButtonGroup, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { filterContext } from "../Pages/PageMain";
import { useContext } from "react";

const NavBar = () => {
    const { filter, setFilter } = useContext(filterContext);
    const [value, setValue] = React.useState(0);

    return (
        <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
        >
            <Button
                size="small"
                component={RouterLink}
                to="/books/new"
                variant="contained"
            >
                New
            </Button>
            <Button
                size="small"
                component={RouterLink}
                to="/allbooks"
                variant="contained"
            >
                All Books
            </Button>
            <Button
                size="small"
                component={RouterLink}
                to="/search"
                variant="contained"
            >
                Search
            </Button>
            <Button
                size="small"
                component={RouterLink}
                to="/searchauthor"
                variant="contained"
            >
                Search by Author
            </Button>
            <Select
                variant="outlined"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
            >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Science Fiction"}>Science Fiction</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"Computing"}>Computing</MenuItem>
                <MenuItem value={"Mystery"}>Mystery</MenuItem>
                <MenuItem value={"Horror"}>Horror</MenuItem>
            </Select>
        </ButtonGroup>
    );
};

export default NavBar;
