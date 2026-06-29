import { Modal, Fade, Button, Stack, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SettingsModalProps {
  open: boolean;
  handleClose: () => void;
}

export const SettingsModal = ({ open, handleClose }: SettingsModalProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    handleClose();
  };

  const menuButtonStyle = {
    borderRadius: "14px",
    textTransform: "none",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    minWidth: "auto",
    padding: "12px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "#000000",
    color: "#ffffff",
    py: 1.5,
    boxShadow: "0 4px 14px rgba(255,255,255,0.15)",
    "&:hover": {
      backgroundColor: "rgba(247, 247, 247, 0.9)",
      boxShadow: "0 6px 20px rgba(255,255,255,0.25)",
      color: "#000"
    },
  };

  // Configuração dos itens do menu para evitar repetição de JSX
  const mainMenuItems = [
    { label: "Sign Up", path: "/register" },
    { label: "Sign In", path: "/login" },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(10, 10, 12, 0.75)",
          },
        },
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={0}
          sx={{
            width: 260,
            p: 1.5,
            borderRadius: "20px",
            backgroundColor: "#16161a",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
          }}
        >
          <Stack spacing={0.5}>
            {/* Renderiza itens principais (Auth) */}
            {mainMenuItems.map((item) => (
              <Button
                key={item.path}
                fullWidth
                sx={menuButtonStyle}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>
            ))}

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)", my: 0.5 }} />
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)", my: 0.5 }} />

            {/* Ação de Fechar */}
            <Button
              fullWidth
              sx={{
                ...menuButtonStyle,
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                },
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};