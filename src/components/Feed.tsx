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
  CardMedia,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PostModal from "./Layout/Modal";
import { getPosts } from "../api/posts/Posts";
import type { Post } from "../api/types/post";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed"; // Ícone extra para o menu lateral

export const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        const data = await getPosts();
        if (isMounted) setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    fetchPosts();
    return () => {
      isMounted = false;
    }
  }, [isModalOpen]);

  // Estilo dos botões de navegação secundários
  const navButtonStyle = {
    borderRadius: "14px",
    textTransform: "none",
    color: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    minWidth: "auto",
    padding: "12px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      color: "#fff",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
    },
  };

  // Estilo dos botões verticais da Sidebar (Desktop)
  const sidebarButtonStyle = {
    justifyContent: "flex-start",
    color: "rgba(255, 255, 255, 0.7)",
    textTransform: "none",
    fontWeight: "600",
    fontSize: "1.05rem",
    borderRadius: "12px",
    py: 1.5,
    px: 2,
    width: "100%",
    transition: "all 0.2s",
    "& .MuiButton-startIcon": { marginRight: 2 },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      color: "#fff",
    },
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#050505",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Coluna no mobile, Linha no Desktop
        justifyContent: "center",
      }}
    >
      {/* 1. BARRA LATERAL (APENAS DESKTOP - md para cima) */}
      <Box
        component="aside"
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          width: "280px",
          height: "100vh",
          position: "sticky",
          top: 0,
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          p: 4,
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={4} sx={{ width: "100%" }}>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: "linear-gradient(45deg, #fff, rgba(255,255,255,0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -1.5,
              cursor: "pointer",
              pl: 1,
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Pixly
          </Typography>

          <Stack spacing={1} sx={{ width: "100%" }}>
            <Button
              startIcon={<DynamicFeedIcon />}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{ ...sidebarButtonStyle, color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.03)" }}
            >
              Feed
            </Button>
            <Button
              startIcon={<PersonSearchIcon />}
              onClick={() => navigate("/search")}
              sx={sidebarButtonStyle}
            >
              Pesquisar
            </Button>
            <Button
              startIcon={<AccountBoxIcon />}
              onClick={() => navigate("/profile")}
              sx={sidebarButtonStyle}
            >
              Perfil
            </Button>
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => setIsModalOpen(true)}
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: "700",
              fontSize: "1rem",
              backgroundColor: "#000000",
              color: "#ffffff",
              py: 1.5,
              boxShadow: "0 4px 14px rgba(255,255,255,0.15)",
              "&:hover": {
                backgroundColor: "rgba(247, 247, 247, 0.9)",
                boxShadow: "0 6px 20px rgba(255,255,255,0.25)",
                color: "#000"
              },
            }}
          >
            Criar Post
          </Button>
        </Stack>
      </Box>

      {/* 2. BARRA SUPERIOR (APENAS MOBILE - ocultada de md para cima) */}
      <Box
        component="header"
        sx={{
          display: { xs: "block", md: "none" },
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(5, 5, 5, 0.75)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          py: 2,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: "linear-gradient(45deg, #fff, rgba(255,255,255,0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -1.5,
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Pixly
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => setIsModalOpen(true)}
              sx={{
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: "700",
                fontSize: "0.9rem",
                backgroundColor: "#fff",
                color: "#000",
                px: 2.5,
                py: 1.2,
                boxShadow: "0 4px 14px rgba(255,255,255,0.15)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.9)",
                },
              }}
            >
              Criar
            </Button>
            <Button onClick={() => navigate("/profile")} sx={navButtonStyle}>
              <AccountBoxIcon />
            </Button>
            <Button onClick={() => navigate("/search")} sx={navButtonStyle}>
              <PersonSearchIcon />
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 3. CONTEÚDO CENTRAL DO FEED */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Container maxWidth="md" sx={{ pt: 4, pb: 8, px: 2 }}>
          <Stack spacing={3}>
            {posts.map((post) => (
              <Card
                key={post.id}
                elevation={0}
                sx={{
                  backgroundColor: "#0d0d0d",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  borderRadius: "5px",
                  color: "#fff",
                  overflow: "hidden",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    backgroundColor: "#111111",
                  },
                }}
              >
                {/* Header do Card */}
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        post.user?.avatar
                          ? `http://localhost:3333/uploads/${post.user.avatar}`
                          : undefined
                      }
                      sx={{
                        bgcolor: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        width: 44,
                        height: 44,
                        fontWeight: "bold",
                      }}
                    >
                      {post.user?.name?.[0].toUpperCase() || "U"}
                    </Avatar>
                  }
                  title={
                    <Typography variant="subtitle1" fontWeight="700" sx={{ fontSize: "0.95rem" }}>
                      {post.user?.name || "Usuário"}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", fontWeight: 500 }}>
                      {post.title}
                    </Typography>
                  }
                  sx={{ p: 2.5, pb: 1.5 }}
                />

                {/* Conteúdo em Texto */}
                <CardContent sx={{ px: 2.5, pt: 0, pb: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.85)",
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {post.contentText}
                  </Typography>
                </CardContent>

                {/* Elemento de Mídia do Post */}
                {(post.contentImageUrl || post.contentImage) && (
                  <Box sx={{ px: 1, pb: 0 }}>
                    <CardMedia
                      component="img"
                      image={
                        post.contentImageUrl
                          ? post.contentImageUrl
                          : `http://localhost:3333/uploads/${post.contentImage}`
                      }
                      alt={post.title}
                      sx={{
                        width: "100%",
                        maxHeight: "500px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.03)",
                      }}
                    />
                  </Box>
                )}

                {/* Ações e Métricas do Card */}
                <CardActions sx={{ px: 2, py: 1.5, gap: 2, borderTop: "1px solid rgba(255,255,255,0.02)", mt: 1 }}>
                  {/* Curtidas */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton
                      size="small"
                      sx={{
                        color: "rgba(255, 255, 255, 0.3)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        p: "6px",
                        transition: "0.2s",
                        "&:hover": {
                          color: "#ef4444",
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                        },
                      }}
                    >
                      <FavoriteBorderIcon sx={{ fontSize: "1.15rem" }} />
                    </IconButton>
                    <Typography variant="caption" fontWeight="600" sx={{ color: "rgba(255,255,255,0.4)", pl: 0.5 }}>
                      0
                    </Typography>
                  </Stack>

                  {/* Comentários */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton
                      size="small"
                      sx={{
                        color: "rgba(255, 255, 255, 0.3)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        p: "6px",
                        transition: "0.2s",
                        "&:hover": {
                          color: "#3b82f6",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        },
                      }}
                    >
                      <ChatBubbleOutlineIcon sx={{ fontSize: "1.15rem" }} />
                    </IconButton>
                    <Typography variant="caption" fontWeight="600" sx={{ color: "rgba(255,255,255,0.4)", pl: 0.5 }}>
                      0
                    </Typography>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Modal para criar novos posts */}
      <PostModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};