/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-30                                                          ║
║                                                                             ║
║  Component that display authors in edit and view page. If mode is edit      ║
║  author can be added. If mode is view author can only be seen.              ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
    Chip,
    Box,
    InputLabel,
    Link,
    List,
    ListItem,
    Paper,
    TextField,
} from "@mui/material";

const ListItemChip = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

const arrayKeying = (list) => {
    return list.map((x, id) =>
        Object.fromEntries([
            ["key", id],
            ["label", x],
        ])
    );
};

// Component
function ChipsArray({
    items,
    onDelete,
    InputProps: inputProperties,
    fieldSetter,
    error,
    helperText,
}) {
    const [chipData, setChipData] = React.useState(arrayKeying(items));

    const handleDelete = (chipToDelete) => () => {
        items.pop();
        setChipData(arrayKeying(items));
        fieldSetter("authors", items);
    };

    const keyPress = (e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            e.preventDefault();
            items.push(e.target.value);
            setChipData(arrayKeying(items));
            fieldSetter("authors", items);
        }
    };

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
            {inputProperties.disabled ? (
                <Box>
                    <InputLabel sx={{ fontSize: "0.8rem" }}>
                        List of Authors:
                    </InputLabel>

                    <List
                        dense={true}
                        sx={{
                            overflow: "auto",
                            maxHeight: 200,
                        }}
                    >
                        {chipData.map((x, id) => {
                            return (
                                <ListItem key={id.toString()}>
                                    <Link
                                        key={id.toString()}
                                        component={RouterLink}
                                        to={`/searchauthor/${x.label}`}
                                        underline="hover"
                                        sx={{ fontSize: 14, m: -0.5 }}
                                    >
                                        {x.label}
                                    </Link>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        listStyle: "none",
                        flexDirection: "row",
                        p: 0.5,
                        m: 0,
                    }}
                >
                    <InputLabel sx={{ fontSize: "0.8rem" }}>
                        List of Authors:
                    </InputLabel>
                    <TextField
                        margin="dense"
                        name="addButton"
                        label="Add Author"
                        variant="outlined"
                        error={error}
                        helperText={helperText}
                        inputProps={inputProperties}
                        onKeyDown={(e) => keyPress(e)}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            listStyle: "none",
                            flexDirection: "row",
                            p: 0.5,
                            m: 0,
                        }}
                    >
                        {chipData.map((x, id) => {
                            return (
                                <ListItemChip key={id.toString()}>
                                    <Chip
                                        label={x.label}
                                        onDelete={
                                            inputProperties.disabled === true
                                                ? undefined
                                                : handleDelete(x)
                                        }
                                    />
                                </ListItemChip>
                            );
                        })}
                    </Box>
                </Box>
            )}
        </Paper>
    );
}

// Exports
export default ChipsArray;
