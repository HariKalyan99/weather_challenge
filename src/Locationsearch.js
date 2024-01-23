import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function LocationSearch({ onChangeInput, searchText }) {
  return (
    <Box
      sx={{
        width: 300,
        maxWidth: "100%",
      }}
    >
      <TextField
        fullWidth
        label="Enter location"
        id="LocationSearch"
        color="secondary"
        onChange={onChangeInput}
        value={searchText} //uncontrolled
        autoComplete="off"
      />
    </Box>
  );
}
