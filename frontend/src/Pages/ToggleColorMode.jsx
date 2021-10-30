/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-26                                                          ║
║                                                                             ║
║  Theme button for dark and light mode.                                      ║
║  Provide context to change color mode and wrapper for App.                  ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// Color mode change button
function ThemeButton() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Tooltip title="Change color theme">
            <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
            >
                {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness5Icon />
                )}
            </IconButton>
        </Tooltip>
    );
}

// Wrapper for application
function ToggleColorMode({ children }) {
    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: { mode },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
}

// Exports
export default ToggleColorMode;
export { ThemeButton };
