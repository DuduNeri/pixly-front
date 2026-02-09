import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { X, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { createPosts } from "../api/posts/createPost";
import { PostModalProps } from "../api/types/post";

const PostModal = ({ open, onClose }: PostModalProps) => {
  const [contentText, setContentText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [posted, setPosted] = useState(false);

  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImage(preview);
  };

  const handlePost = async () => {
    try {
      const postData = {
        title,
        contentText,
        contentImage: image,
      };

      const created = await createPosts(postData);
      console.log(created);

      setPosted(true); 
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
        setPosted(false);
      }
  
    }, [posted]); 

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 420,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            background: "var(--secondary-color)",
          }}
        >
          <IconButton onClick={onClose} sx={{ color: "var(--accent-pink)" }}>
            <X size={20} />
          </IconButton>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{
              position: "absolute",
              color: "#666666",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Criar publicação
          </Typography>
        </Box>

        {/* Título */}
        <Box sx={{ px: 2, py: 1, background: "var(--secondary-color)" }}>
          <TextField
            fullWidth
            placeholder="Título do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: 16, color: "#fff" },
            }}
          />
        </Box>

        {/* Image Upload */}
        <Box
          component="label"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 240,
            background: "var(--secondary-color)",
            cursor: "pointer",
          }}
        >
          {image ? (
            <Box
              component="img"
              src={image}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Box sx={{ textAlign: "center", color: "#666666" }}>
              <ImagePlus size={48} />
              <Typography variant="body2" mt={1}>
                Adicionar foto
              </Typography>
            </Box>
          )}

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Box>

        {/* Descrição */}
        <Box sx={{ px: 2, py: 1.5, background: "var(--secondary-color)" }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Escreva algo..."
            variant="standard"
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: { fontSize: 15, color: "#fff" },
            }}
          />

          <Box sx={{ display: "flex" }}>
            <Button
              size="small"
              onClick={handlePost}
              sx={{
                ml: "auto",
                color: "var(--accent-pink)",
                fontWeight: 600,
                textTransform: "none",
              }}
              disabled={!title || !contentText}
            >
              Postar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;
