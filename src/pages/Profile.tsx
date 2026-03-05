import {
  Box,
  Typography,
  Container,
  Avatar,
  Divider,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import HomeIcon from "@mui/icons-material/Home";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import { SettingsModal } from "./ModalSettings/Settings";
import { ExcludeModal } from "./Layouts/ExcludeModal";
import { getPostsByUser } from "../api/posts/Posts";
import type { Post } from "../api/types/post";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export const Profile = () => {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);
  const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const handleOpenDelete = (id: string) => {
    setSelectedPostId(id);
    setIsExcludeModalOpen(true);
  };

  const handlePostDeleted = useCallback(() => {
    setPosts((prev) => prev.filter((p) => p.id !== selectedPostId));
    setIsExcludeModalOpen(false);
    setSelectedPostId(null);
  }, [selectedPostId]);

  const userName = posts[0]?.user?.name;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const data = await getPostsByUser(userId);
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const pinkButtonStyle = {
    borderRadius: "10px",
    textTransform: "none",
    color: "var(--accent-pink, #ff1493)",
    minWidth: "auto",
    padding: { xs: "8px", sm: "12px" },
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
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header Sticky - Sem alterações */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Container
          maxWidth="md"
          sx={{ py: 1, px: 2, display: "flex", justifyContent: "center" }}
        >
          <Stack
            direction="row"
            sx={{
              width: "100%",
              maxWidth: "500px",
              justifyContent: "space-around",
            }}
          >
            <Button onClick={() => navigate("/home")} sx={pinkButtonStyle}>
              <HomeIcon />
            </Button>
            <Button onClick={() => navigate("/search")} sx={pinkButtonStyle}>
              <PersonSearchIcon />
            </Button>
            {/* <Button onClick={() => navigate("/profile")} sx={pinkButtonStyle}>
              <AccountBoxIcon />
            </Button> */}
            <Button onClick={handleOpenSettings} sx={pinkButtonStyle}>
              <PermDataSettingIcon />
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Corpo do Perfil */}
      <Container
        maxWidth="lg"
        sx={{ flexGrow: 1, pt: { xs: 4, md: 6 }, pb: 10 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: { xs: 100, md: 140 },
              height: { xs: 100, md: 140 },
              mb: 3,
              border: "3px solid #0a0a0a",
              boxShadow: "0px 0px 30px rgba(255, 20, 147, 0.2)",
            }}
          />

          <Typography
            variant="h4"
            fontWeight="800"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.125rem" },
              background:
                "linear-gradient(90deg, var(--accent-purple), var(--accent-color))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {userName || "..."}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 4 }} />

        {/* Grid */}
        {posts.length === 0 ? (
          <Typography textAlign="center" color="gray" sx={{ mt: 4 }}>
            Nenhum post ainda.
          </Typography>
        ) : (
          <Grid container spacing={15}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    backgroundColor: "#111",
                    borderRadius: "12px",
                    padding: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                    transition: "0.3s",
                    border: "1px solid rgba(255,255,255,0.05)",
                    "&:hover": { transform: "translateY(-4px)" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      noWrap
                      sx={{ maxWidth: "80%" }}
                    >
                      {post.title}
                    </Typography>

                    <Tooltip title="Excluir post">
                      <IconButton
                        onClick={() => handleOpenDelete(post.id)}
                        size="small"
                        sx={{
                          color: "rgba(255, 0, 0, 0.3)",
                          "&:hover": { color: "#ff4444" },
                        }}
                      >
                        <DeleteSweepIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography
                    variant="body2"
                    color="gray"
                    sx={{
                      whiteSpace: "pre-line",
                      mb: 2,
                      flexGrow: 1,
                    }}
                  >
                    {post.contentText}
                  </Typography>

                  {post.contentImage && (
                    <Box
                      component="img"
                      src={`http://localhost:3333/uploads/${post.contentImage}`}
                      alt={post.title}
                      sx={{
                        width: "100%",
                        height: "150px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        mt: "auto",
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Modais - Sem alterações */}
      <ExcludeModal
        open={isExcludeModalOpen}
        onClose={() => setIsExcludeModalOpen(false)}
        postId={selectedPostId}
        onDeleted={handlePostDeleted}
      />
      <SettingsModal open={openSettings} handleClose={handleCloseSettings} />
    </Box>
  );
};
