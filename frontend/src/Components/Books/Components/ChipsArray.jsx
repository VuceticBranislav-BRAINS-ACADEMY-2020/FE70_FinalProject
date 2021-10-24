import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const ListItem = styled("li")(({ theme }) => ({
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

function ChipsArray({
    items,
    onDelete,
    InputProps: inputProperties,
    fieldSetter,
}) {
    const [chipData, setChipData] = React.useState(arrayKeying(items));

    const handleDelete = (chipToDelete) => () => {
        items.pop();
        setChipData(arrayKeying(items));
        fieldSetter("authors", items);
    };

    const keyPress = (e) => {
        console.log(e.code);
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
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            <TextField
                margin="normal"
                name="addButton"
                // value={addButton}
                // onChange={handleChange}
                // onBlur={handleBlur}
                variant="outlined"
                InputProps={inputProperties}
                sx={
                    inputProperties.readOnly
                        ? { visibility: "hidden" }
                        : { visibility: "visible" }
                }
                onKeyDown={(e) => keyPress(e)}
            />
            {chipData.map((data) => {
                return (
                    <ListItem key={data.key}>
                        <Chip
                            InputProps={inputProperties}
                            label={data.label}
                            onDelete={
                                inputProperties.readOnly === true
                                    ? undefined
                                    : handleDelete(data)
                            }
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}

export default ChipsArray;
