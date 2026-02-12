import { Box, IconButton, Typography, Button } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "var(--tertiary-color)",
          width: "400px",
          minHeight: 300, 
        }}
      >
        <Typography>Sidebar aqui</Typography>
      </Box>
    </>
  );
};
