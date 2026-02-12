import {
  Box,
  Typography,
  Container,
  Avatar,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { SettingsModal } from "./ModalSettings/Settings";
import { useState } from "react";

export const Profile = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const pinkButtonStyle = {
    borderRadius: "10px",
    textTransform: "none",
    color: "var(--accent-pink)",
    minWidth: "auto", 
    padding: { xs: "8px", sm: "12px" }, 
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      filter: "brightness(1.1)",
      boxShadow: "0 6px 20px rgba(255, 20, 147, 0.3)",
    },
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Sticky */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(10, 10, 10, 0.8)", 
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            py: 1,
            px: 2,
            display: "flex",
            justifyContent: "center", 
          }}
        >
          {/* Botões ajustados para mobile */}
          <Stack
            direction="row"
            sx={{
              width: "100%",
              maxWidth: "500px", 
              justifyContent: "space-around", 
            }}
          >
            <Button onClick={() => navigate("/home")} sx={pinkButtonStyle}>
              <HomeIcon />
            </Button>

            <Button onClick={() => navigate("/profile")} sx={pinkButtonStyle}>
              <AccountBoxIcon />
            </Button>

            <Button onClick={handleOpen} sx={pinkButtonStyle}>
              <PermDataSettingIcon />
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Corpo do Perfil */}
      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          pt: { xs: 4, md: 6 }, 
          pb: 10,
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* Header do Perfil */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: { xs: 100, md: 140 }, 
              height: { xs: 100, md: 140 },
              mb: 3,
              border: "3px solid #0a0a0a",
              boxShadow: "0px 0px 30px rgba(63, 81, 181, 0.3)",
            }}
            src="https://i.pravatar.cc/150?img=11"
          />
          <Typography
            variant="h4"
            fontWeight="800"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", md: "2.125rem" } }} 
          >
            Nome do Usuário
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

        {/* Grid de Informações e Posts entrariam aqui */}
      </Container>
      <SettingsModal open={open} handleClose={handleClose} />
    </Box>
  );
};
