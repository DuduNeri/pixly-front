import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { deletePost } from "../../api/posts/Posts";

interface ExcludeModalProps {
  open: boolean;
  onClose: () => void;
  postId: string | null;
  onDeleted: () => void;
}

export const ExcludeModal = ({
  open,
  onClose,
  postId,
  onDeleted,
}: ExcludeModalProps) => {
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
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            transition: "all 0.3s ease",
          },
        },
      }}
      sx={{
        display: "grid",
        placeItems: "center",
        p: 2,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            backgroundColor: "#0d0d0d",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
            width: "100%",
            maxWidth: 380,
            overflow: "hidden",
            outline: "none",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Cabeçalho e Mensagem */}
          <Box sx={{ p: 4, pb: 3 }}>
            <Typography
              variant="h6"
              fontWeight="800"
              color="#fff"
              sx={{ letterSpacing: "-0.5px", mb: 1.5 }}
            >
              Excluir publicação?
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.5)", lineHeight: 1.5, px: 1 }}
            >
              Tem certeza? Essa ação não pode ser desfeita e removerá o post
              permanentemente do seu feed.
            </Typography>
          </Box>

          {/* Grupo de Botões (Estilo List-Menu do Instagram) */}
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            {/* Botão de Exclusão */}
            <Button
              onClick={handleDelete}
              disabled={loading}
              sx={{
                py: 2,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#ed4956",
                fontWeight: "700",
                textTransform: "none",
                fontSize: "0.95rem",
                borderRadius: 0,
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(237, 73, 86, 0.05)",
                },
                "&.Mui-disabled": {
                  color: "rgba(237, 73, 86, 0.3)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#ed4956" }} />
              ) : (
                "Excluir"
              )}
            </Button>

            {/* Botão Cancelar */}
            <Button
              onClick={onClose}
              disabled={loading}
              sx={{
                py: 2,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#fff",
                fontWeight: "400",
                textTransform: "none",
                fontSize: "0.95rem",
                borderRadius: 0,
                transition: "background-color 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                },
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
