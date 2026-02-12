import { Modal, Fade, Button, Stack, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SettingsModalProps {
  open: boolean;
  handleClose: () => void;
}


export const SettingsModal = ({ open, handleClose }: SettingsModalProps) => {
  const navigate = useNavigate();

  const pinkButtonStyle = {
    borderRadius: "10px",
    textTransform: "none",
    color: "var(--accent-pink)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-2px)",
      filter: "brightness(1.1)",
      boxShadow: "0 6px 20px rgba(255, 20, 147, 0.3)",
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={10}
          sx={{
            width: 250,
            p: 2,
            borderRadius: 3,
            backgroundColor: "#111",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Stack spacing={1}>
            <Button
              fullWidth
              sx={pinkButtonStyle}
              onClick={() => {
                navigate("/register");
                handleClose();
              }}
            >
              Sign Up
            </Button>

            <Button
              fullWidth
              sx={pinkButtonStyle}
              onClick={() => {
                navigate("/login");
                handleClose();
              }}
            >
              Login
            </Button>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

            <Button
              fullWidth
              sx={pinkButtonStyle}
              onClick={() => {
                navigate("/profile");
                handleClose();
              }}
            >
              Profile
            </Button>

            {/* <Button
              fullWidth
              sx={pinkButtonStyle}
              onClick={() => {
                navigate("/settings");
                handleClose();
              }}
            >
              Settings
            </Button> */}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

            <Button
              fullWidth
              sx={{
                ...pinkButtonStyle,
                color: "#ff4d4f",
              }}
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};
