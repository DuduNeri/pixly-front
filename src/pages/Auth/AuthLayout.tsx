import { Box, Paper, Container } from "@mui/material";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#050505", // Fundo geral super escuro (Amoled)
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Detalhe sutil de iluminação de fundo (Glow Effect) */}
      <Box
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          top: "10%",
          left: "15%",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          backgroundImage: "radial-gradient(circle, rgba(219,39,119,0.03) 0%, transparent 75%)",
          bottom: "10%",
          right: "10%",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xs" sx={{ zIndex: 1, px: 2 }}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: { xs: 3, sm: 5 },
            borderRadius: "28px", // Cantos bem arredondados e modernos
            backgroundColor: "#0d0d0d", // Cartão ligeiramente mais claro que o fundo
            border: "1px solid rgba(255, 255, 255, 0.05)", // Linha fina premium
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Paper>
      </Container>
    </Box>
  );
}