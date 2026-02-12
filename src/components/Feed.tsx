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
  colors,
} from "@mui/material";
import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PostModal from "./Layout/Modal";
import { getPosts } from "../api/posts/Posts";
import type { Post } from "../api/types/post";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { ExcludeModal } from "./Layout/ExcludeModal";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { SettingsModal } from "../pages/ModalSettings/Settings";

export const Feed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
   const [open, setOpen] = useState(false);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleOpenDelete = (id: string) => {
    setSelectedPostId(id);
    setIsExcludeModalOpen(true);
  };

  const handlePostDeleted = () => {
    setPosts((prev) => prev.filter((p) => p.id !== selectedPostId));
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
  }, [isModalOpen]);

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
            Criar
          </Button>

          <Button onClick={() => navigate("/home")} sx={pinkButtonStyle}>
            <HomeIcon />
          </Button>

          <Button onClick={() => navigate("/profile")} sx={pinkButtonStyle}>
            <AccountBoxIcon />
          </Button>

          <Button onClick={handleOpen} sx={pinkButtonStyle}>
            <PermDataSettingIcon />
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
                /* Options */
                action={
                  <IconButton
                    sx={{
                      color: "var(--accent-purple)",
                      transition: "0.5s ease",
                      "&:hover": { color: "var(--accent-pink)" },
                    }}
                  >
                    <DeleteSweepIcon
                      onClick={() => handleOpenDelete(post.id)}
                    />
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
                    sx={{
                      color: "primary.light",
                      opacity: 0.8,
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
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
              {(post.contentImageUrl || post.contentImage) && (
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
                    maxHeight: "600px",
                    objectFit: "contain",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "block",
                  }}
                />
              )}
              <CardActions sx={{ px: 2, py: 1.5, gap: 1 }}>
                {/* Botões de Interação */}
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
      <ExcludeModal
        open={isExcludeModalOpen}
        onClose={() => setIsExcludeModalOpen(false)}
        postId={selectedPostId}
        onDeleted={handlePostDeleted}
      />
      <SettingsModal open={open} handleClose={handleClose} />
    </Box>
  );
};
