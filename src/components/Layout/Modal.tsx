import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Tooltip,
  Fade,
} from "@mui/material";
import { X, ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPosts } from "../../api/posts/Posts";

export interface PostModalProps {
  open: boolean;
  onClose: () => void;
}

const PostModal = ({ open, onClose }: PostModalProps) => {
  const [contentText, setContentText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [posted, setPosted] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const handlePost = async () => {
    try {
      const postData = { title, contentText, contentImage: image };
      await createPosts(postData);
      setPosted(true);
      console.log(postData)
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  useEffect(() => {
    if (posted) {
      onClose();
      setTitle("");
      setContentText("");
      setImage(null);
      setPreview(null);
      setPosted(false);
    }
  }, [posted, onClose]);

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          sx: { backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.8)" },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 500,
            bgcolor: "#121212",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.8)",
            outline: "none",
            overflow: "hidden",
          }}
        >
          {/* Header Customizado */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              py: 2.5,
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>
              Nova publicação
            </Typography>
            <IconButton 
              onClick={onClose}
              sx={{ color: "rgba(255,255,255,0.3)", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.05)" } }}
            >
              <X size={22} />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            {/* Título Estilizado */}
            <TextField
              fullWidth
              placeholder="Dê um título ao seu post..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { 
                  color: "#fff", 
                  fontSize: "1.3rem", 
                  fontWeight: 700,
                  "&::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1 }
                },
              }}
            />

            {/* Area de Upload Refinada */}
            <Box
              sx={{
                position: "relative",
                height: 240,
                mt: 3,
                borderRadius: "20px",
                border: preview ? "1px solid rgba(255,255,255,0.1)" : "2px dashed rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                transition: "all 0.3s ease",
                bgcolor: "rgba(255,255,255,0.02)",
                "&:hover": {
                  borderColor: preview ? "rgba(255,255,255,0.2)" : "var(--accent-pink)",
                  bgcolor: "rgba(255,255,255,0.04)",
                }
              }}
            >
              {preview ? (
                <>
                  <Box
                    component="img"
                    src={preview}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <Tooltip title="Remover imagem">
                    <IconButton
                      onClick={() => { setImage(null); setPreview(null); }}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        backdropFilter: "blur(4px)",
                        "&:hover": { bgcolor: "#ff4b4b" }
                      }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Box 
                  component="label" 
                  sx={{ 
                    cursor: "pointer", 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    gap: 1.5
                  }}
                >
                  <Box sx={{ p: 2, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                    <ImagePlus size={32} />
                  </Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 500, fontSize: "0.9rem" }}>
                    Adicionar foto
                  </Typography>
                  <input hidden type="file" accept="image/*" onChange={handleImageChange} />
                </Box>
              )}
            </Box>

            {/* Área de Texto Refinada */}
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="O que você está pensando?"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              variant="standard"
              sx={{ mt: 3 }}
              InputProps={{
                disableUnderline: true,
                sx: { 
                  color: "rgba(255,255,255,0.8)", 
                  fontSize: "1rem",
                  lineHeight: 1.6
                },
              }}
            />

            {/* Botão de Postagem */}
            <Button
              fullWidth
              onClick={handlePost}
              disabled={!title || !contentText}
              variant="contained"
              sx={{ 
                mt: 4, 
                py: 1.5,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: 800,
                fontSize: "1rem",
                background: "var(--accent-pink, #ff1493)",
                boxShadow: "0 8px 20px rgba(255, 20, 147, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "var(--accent-pink, #ff1493)",
                  filter: "brightness(1.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-disabled": {
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.2)"
                }
              }}
            >
              Postar publicação
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PostModal;