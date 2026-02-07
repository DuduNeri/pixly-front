import { Box, Paper } from "@mui/material";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <Paper
        sx={{
          width: 420,
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
          color: "#09daff",
        }}
        elevation={10}
      >
        {children}
      </Paper>
    </Box>
  );
}
