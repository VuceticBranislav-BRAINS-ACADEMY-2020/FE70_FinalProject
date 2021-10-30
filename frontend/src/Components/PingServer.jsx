/* Informations 
╔═════════════════════════════════════════════════════════════════════════════╗
║  v1.0  :  21-10-29                                                          ║
║                                                                             ║
║  Show is server available and has correct version for this frontend.        ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════*/

// Imports
import React, { useEffect, useState } from "react";
import HealingIcon from "@mui/icons-material/Healing";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import { Box, Typography, Link } from "@mui/material";

// Fetch varsion string from server. I case that string is not correct
// or unreachable return invalid server status.
const useCheckServer = (url) => {
    const [result, setResult] = useState([]);
    useEffect(async () => {
        try {
            let resp = await fetch(url);
            let data = await resp.json();
            if (data.body === "v0.1myserver") {
                setResult(true);
            } else {
                setResult(false);
            }
        } catch (err) {
            setResult(false);
        }
    }, [url]);

    return result;
};

// Component
const PingServer = () => {
    const resp = useCheckServer("http://localhost:3081/app/status");
    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="stretch"
        >
            {resp ? (
                <Typography
                    display="flex"
                    flexDirection="row"
                    sx={{ mt: 5, textAlign: "center" }}
                >
                    <HealthAndSafetyIcon color="success" />
                    &#160;Right version of server is available.
                </Typography>
            ) : (
                <Typography
                    display="flex"
                    flexDirection="column"
                    sx={{ mt: 5, textAlign: "center" }}
                >
                    <Box display="flex" flexDirection="row">
                        <HealingIcon color="error" />
                        &#160;Invalid server version or server not reachable.
                    </Box>
                    <Box>
                        You can user server from&#160;
                        <Link
                            // rel="noopener noreferrer"
                            target="_blank"
                            href="https://github.com/VuceticBranislav-BRAINS-ACADEMY-2020/FE70_FinalProject/tree/master/backend"
                            underline="always"
                        >
                            here.
                        </Link>
                    </Box>
                </Typography>
            )}
        </Box>
    );
};

// Exports
export { PingServer };
