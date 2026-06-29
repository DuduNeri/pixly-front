import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import type { Post } from "../../api/types/post";
import { getComments } from "../../api/posts/Posts";
import { createComment } from "../../api/posts/Posts";

interface CommentFromServer {
  id: string;
  content: string;
  postId: string;
  userId: string;
  user?: {
    name: string;
    avatar?: string;
  };
  createdAt?: string;
}

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  post: Post;
  avatarVersion?: number;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  open,
  onClose,
  post,
  avatarVersion = 0,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentFromServer[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchComments = async () => {
    try {
      const data = await getComments(post.id);
      if (Array.isArray(data)) {
        setComments(data);
      } else if (data) {
        setComments(Object.values(data));
      }
    } catch (error) {
      console.error("Erro ao buscar comentários da API:", error);
    }
  };

  useEffect(() => {
    if (open && post.id) {
      fetchComments();
    }
  }, [open, post.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const loggedInUserId = localStorage.getItem("userId");
    if (!loggedInUserId) {
      alert("Você precisa estar logado para comentar.");
      return;
    }

    const createCommentPayload = {
      content: commentText,
      postId: post.id,
      userId: loggedInUserId,
    };

    try {
      const newComment = await createComment(createCommentPayload);

      if (newComment) {
        await fetchComments();
        setCommentText("");
      } else {
        console.error("O backend retornou um erro ao criar o comentário.");
      }
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
    }
  };
  const postImageUrl = post.contentImageUrl
    ? post.contentImageUrl
    : post.contentImage
      ? `http://localhost:3333/uploads/${post.contentImage}`
      : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "8px",
          height: isMobile ? "100%" : "80vh",
          maxHeight: 800,
          width: "100%",
          backgroundColor: "#0d0d0d",
          color: "#fff",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        },
      }}
    >
      {/* Header exclusivo para Mobile */}
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", ml: 2 }}>
            Comentários
          </Typography>
        </Box>
      )}

      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100%",
        }}
      >
        {postImageUrl && (
          <Box
            sx={{
              flex: 1.3,
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: isMobile ? "35vh" : "100%",
              borderRight: "1px solid rgba(255, 255, 255, 0.04)",
            }}
          >
            <img
              src={postImageUrl}
              alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        )}

        {/* LADO DIREITO: Conteúdo, Comentários e Input */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: isMobile
              ? postImageUrl
                ? "calc(65vh - 57px)"
                : "calc(100vh - 57px)"
              : "100%",
          }}
        >
          {/* Header do Dono do Post (Apenas Desktop) */}
          {!isMobile && (
            <Box
              sx={{
                p: 2.5,
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Avatar
                src={
                  post.user?.avatar
                    ? `http://localhost:3333/uploads/${post.user.avatar}?v=${avatarVersion}`
                    : undefined
                }
                sx={{
                  mr: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {post.user?.name?.[0].toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: "700" }}>
                  {post.user?.name || "Usuário"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {post.title}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Lista de Comentários */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {comments.length === 0 ? (
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ flexGrow: 1, py: 4, color: "rgba(255,255,255,0.3)" }}
              >
                <ChatBubbleOutlineIcon sx={{ fontSize: "2rem", mb: 1 }} />
                <Typography variant="body2">
                  Nenhum comentário ainda.
                </Typography>
              </Stack>
            ) : (
              comments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Avatar
                      src={
                        comment.user?.avatar
                          ? `http://localhost:3333/uploads/${comment.user.avatar}`
                          : undefined
                      }
                      sx={{
                        mr: 2,
                        width: 32,
                        height: 32,
                        bgcolor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      {comment.user?.name?.[0].toUpperCase() || "U"}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                        <span style={{ fontWeight: "700", marginRight: "8px" }}>
                          {comment.user?.name || "Usuário"}
                        </span>
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Input de Texto do Comentário */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0d0d0d",
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Adicione um comentário..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { color: "#fff", fontSize: "0.95rem" },
              }}
              sx={{ mr: 1 }}
            />
            <Button
              type="submit"
              disabled={!commentText.trim()}
              sx={{
                fontWeight: "700",
                textTransform: "none",
                minWidth: "auto",
                color: commentText.trim() ? "#3b82f6" : "rgba(255,255,255,0.2)",
                "&:disabled": { color: "rgba(255,255,255,0.15)" },
              }}
            >
              Publicar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
