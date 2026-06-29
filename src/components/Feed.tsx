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
  Drawer,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import PostModal from "./Layout/Modal";
import { getPosts } from "../api/posts/Posts";
import type { Post } from "../api/types/post";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { SettingsModal } from "../pages/Layouts/Settings";
import { createLike } from "../api/posts/Posts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CommentModal } from "../pages/Layouts/CommentModal";

export const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [openSettings, setOpenSettings] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Estado para controlar o modal de comentário e qual post está ativo
  const [isOpenModalComment, setIsCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const navigate = useNavigate();
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);
  const handleToggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleOpenCommentModal = (post: Post) => {
    setSelectedPost(post);
    setIsCommentModal(true);
  };

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
    };
  }, [isModalOpen, isOpenModalComment]);

  const handleLike = async (postId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const result = await createLike(userId, postId);
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                liked: result.liked,
                likesCount: result.likesCount,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const sidebarButtonStyle = {
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
      color: "#000",
    },
  };

  const renderSidebarNavigation = () => (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Button
        variant="contained"
        startIcon={<AddPhotoAlternateIcon />}
        onClick={() => {
          setIsModalOpen(true);
          setMobileMenuOpen(false);
        }}
        sx={{
          ...sidebarButtonStyle,
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          "&:hover": {
            ...sidebarButtonStyle["&:hover"],
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#000000",
          },
        }}
      >
        Criar Post
      </Button>
      <Button
        startIcon={<DynamicFeedIcon />}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setMobileMenuOpen(false);
        }}
        sx={{
          ...sidebarButtonStyle,
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "#ffffff",
          },
        }}
      >
        Feed
      </Button>
      <Button
        startIcon={<PersonSearchIcon />}
        onClick={() => {
          navigate("/search");
          setMobileMenuOpen(false);
        }}
        sx={sidebarButtonStyle}
      >
        Pesquisar
      </Button>
      <Button
        startIcon={<AccountCircleIcon />}
        onClick={() => {
          navigate("/profile");
          setMobileMenuOpen(false);
        }}
        sx={sidebarButtonStyle}
      >
        Perfil
      </Button>
      <Button
        startIcon={<PermDataSettingIcon />}
        onClick={() => {
          handleOpenSettings();
          setMobileMenuOpen(false);
        }}
        sx={sidebarButtonStyle}
      >
        Opções
      </Button>
    </Stack>
  );

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "#050505",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
      }}
    >
      {/* 1. BARRA LATERAL FIXED */}
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
          {renderSidebarNavigation()}
        </Stack>
      </Box>

      {/* 2. BARRA SUPERIOR MOBILE */}
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
          py: 1.5,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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

          <IconButton
            onClick={handleToggleMobileMenu}
            sx={{
              color: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              p: 1.2,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Container>
      </Box>

      {/* 3. MENU LATERAL DRAWER MOBILE */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleToggleMobileMenu}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
        PaperProps={{
          sx: {
            width: "280px",
            backgroundColor: "#050505",
            borderRight: "1px solid rgba(255, 255, 255, 0.06)",
            p: 3,
            display: "flex",
            flexDirection: "column",
          },
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
            mb: 4,
            pl: 1,
          }}
        >
          Pixly
        </Typography>
        {renderSidebarNavigation()}
      </Drawer>

      {/* 4. CONTEÚDO CENTRAL DO FEED */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Container
          maxWidth={false}
          sx={{ maxWidth: "770px", mx: "auto", pt: 4, pb: 8, px: 2 }}
        >
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
                    <Typography
                      variant="subtitle1"
                      fontWeight="700"
                      sx={{ fontSize: "0.95rem" }}
                    >
                      {post.user?.name || "Usuário"}
                    </Typography>
                  }
                  subheader={
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255, 255, 255, 0.4)",
                        fontWeight: 500,
                      }}
                    >
                      {post.title}
                    </Typography>
                  }
                  sx={{ p: 2.5, pb: 1.5 }}
                />

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

                {(post.contentImageUrl || post.contentImage) && (
                  <Box sx={{ px: 1, pb: 0, mt: 1.5 }}>
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

                <CardActions
                  sx={{
                    px: 2,
                    py: 1.5,
                    gap: 2,
                    borderTop: "1px solid rgba(255,255,255,0.02)",
                    mt: 1,
                  }}
                >
                  {/* Botão de Like */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton
                      onClick={() => handleLike(post.id)}
                      size="small"
                      sx={{
                        color: post.liked ? "#ef4444" : "rgba(255,255,255,0.3)",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        p: "6px",
                        transition: "0.2s",
                        "&:hover": {
                          color: "#ef4444",
                          backgroundColor: "rgba(239,68,68,0.1)",
                        },
                      }}
                    >
                      {post.liked ? (
                        <FavoriteIcon sx={{ fontSize: "1.15rem" }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: "1.15rem" }} />
                      )}
                    </IconButton>
                    <Typography
                      variant="caption"
                      fontWeight="600"
                      sx={{ color: "rgba(255,255,255,0.4)", pl: 0.5 }}
                    >
                      {post.likesCount ?? 0}
                    </Typography>
                  </Stack>

                  {/* 2. Botão de Comentários Ajustado */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton
                      onClick={() => handleOpenCommentModal(post)}
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
                    <Typography
                      variant="caption"
                      fontWeight="600"
                      sx={{ color: "rgba(255,255,255,0.4)", pl: 0.5 }}
                    >
                      {post.comments?.length || 0}
                    </Typography>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </Container>
      </Box>

      <PostModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <SettingsModal open={openSettings} handleClose={handleCloseSettings} />

      {/* 3. Injeção do Modal de Comentários no DOM */}
      {selectedPost && (
        <CommentModal
          open={isOpenModalComment}
          onClose={() => {
            setIsCommentModal(false);
            setSelectedPost(null);
          }}
          post={selectedPost} 
        />
      )}
    </Box>
  );
};
