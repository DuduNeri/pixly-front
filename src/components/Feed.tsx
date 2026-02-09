import {
  Box,
  IconButton,
  Container,
  Stack,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  CardMedia,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostModal from "./Modal";
import { getPosts } from "../api/posts/searchPosts";
import type { Post } from "../api/types/post";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.log("Erro ao buscar posts:", error);
      }
    }
    fetchPosts();
  }, [isModalOpen]);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* HEADER FIXO */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          py: 2,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="900"
            sx={{ color: "#fff", letterSpacing: -1 }}
          >
            {" "}
            Pixly{" "}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: "bold",
              background: "var(--accent-pink)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                background: "var(--accent-pink)",
                filter: "brightness(1.1)",
                boxShadow: "0 6px 20px rgba(255, 20, 147, 0.3)",
              },
            }}
          >
            Criar post
          </Button>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <Stack spacing={4}>
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                color: "#fff",
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": { borderColor: "rgba(255, 255, 255, 0.15)" },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: "secondary.main", width: 42, height: 42 }}
                  >
                    {post.user?.name?.[0] || "U"}
                  </Avatar>
                }
                action={
                  <IconButton sx={{ color: "rgba(255,255,255,0.3)" }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Typography variant="subtitle1" fontWeight="700">
                    {post.user?.name || "Usuário"}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="caption"
                    sx={{ color: "primary.light", opacity: 0.8 }}
                  >
                    {post.title}
                  </Typography>
                }
              />

              <CardContent sx={{ pt: 0, pb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6 }}
                >
                  {post.contentText}
                </Typography>
              </CardContent>

              {post.contentImageUrl ? (
                <CardMedia
                  component="img"
                  image={post.contentImageUrl}
                  alt={post.title}
                  sx={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                />
              ) : (
                post.contentImage && (
                  <CardMedia
                    component="img"
                    image={`http://localhost:3333/uploads/${post.contentImage}`}
                    alt={post.title}
                  />
                )
              )}
              <CardActions sx={{ px: 2, py: 1.5, gap: 1 }}>
                {/* Botões de Interação (Like/Chat) aqui... */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      "&:hover": { color: "#ff4b4b" },
                    }}
                  >
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    0
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      "&:hover": { color: "#4bcaff" },
                    }}
                  >
                    <ChatBubbleOutlineIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    0
                  </Typography>
                </Stack>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Container>
      <PostModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};
