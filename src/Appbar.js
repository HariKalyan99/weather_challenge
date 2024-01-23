import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, padding: "1.5rem", backgroundColor: "black" }}
        >
          Weather App
        </Typography>
      </AppBar>
    </Box>
  );
}
