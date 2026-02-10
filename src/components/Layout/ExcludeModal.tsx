import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { deletePost } from "../../api/posts/Posts";

interface ExcludeModalProps {
  open: boolean;
  onClose: () => void;
  postId: string | null;
  onDeleted: () => void;
}

export const ExcludeModal = ({ open, onClose, postId, onDeleted, } : ExcludeModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!postId) return;

    try {
      setLoading(true);
      await deletePost(postId);

      onDeleted(); 
      onClose();
    } catch (err) {
      console.error("Erro ao deletar post:", err);
      alert("Erro ao excluir post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#1a1a1a",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          boxShadow: 24,
          p: 4,
          color: "white",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Confirmar Exclusão
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.7 }}>
          Tem certeza que deseja excluir este post? Essa ação **não pode ser
          desfeita**.
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button onClick={onClose} disabled={loading} sx={{ color: "white" }}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={loading}
            sx={{
              background: "var(--accent-pink)",
              minWidth: 110,
              "&:hover": { background: "var(--accent-pink)" },
            }}
          >
            {loading ? <CircularProgress size={20} /> : "Excluir"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
