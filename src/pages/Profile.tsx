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
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import HomeIcon from "@mui/icons-material/Home";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import { SettingsModal } from "./ModalSettings/Settings";
import { ExcludeModal } from "./Layouts/ExcludeModal";
import { getPostsByUser } from "../api/posts/Posts";
import type { Post } from "../api/types/post";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AvatarModal from "../components/Layout/Avatar";
import { getUser } from "../api/users/users";

export const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [isExcludeModalOpen, setIsExcludeModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [avatarVersion, setAvatarVersion] = useState(0);
  const [avatar, setAvatar] = useState<string>(" ");
  const [posts, setPosts] = useState<Post[]>([]);

  const userId = localStorage.getItem("userId") || "";
  const userName = localStorage.getItem("userName");

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

  const fetchPosts = useCallback(async () => {
    try {
      if (!userId) return;
      const data = await getPostsByUser(userId);
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchUser = useCallback(async () => {
    try {
      if (!userId) return;
      const user = await getUser(userId);
      if (user && user.avatar) {
        setAvatar(user.avatar);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Estilo dos botões de navegação do topo (Mobile)
  const headerNavButtonStyle = {
    borderRadius: "14px",
    textTransform: "none",
    color: "rgba(255, 255, 255, 0.6)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    minWidth: "auto",
    padding: { xs: "10px 18px", sm: "12px 24px" },
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "& :svg": { fontSize: "1.3rem" },
    "&:hover": {
      color: "#fff",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
    },
  };

  // Estilo dos botões verticais da Sidebar (Desktop)
  const sidebarButtonStyle = {
    justify: "flex-start",
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
        color: "#fff",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* 1. BARRA LATERAL (DESKTOP) */}
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
          flexShrink: 0,
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
            onClick={() => navigate("/home")}
          >
            Pixly
          </Typography>

          <Stack spacing={1} sx={{ width: "100%" }}>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => navigate("/home")}
              sx={sidebarButtonStyle}
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
              startIcon={<PermDataSettingIcon />}
              onClick={handleOpenSettings}
              sx={sidebarButtonStyle}
            >
              Configurações
            </Button>
            <Button
              startIcon={<AccountCircleIcon />}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                ...sidebarButtonStyle,
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              Perfil
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* 2. BARRA SUPERIOR (MOBILE) */}
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
        }}
      >
        <Container
          maxWidth="md"
          sx={{ py: 1.5, px: 2, display: "flex", justifyContent: "center" }}
        >
          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 4 }}
            sx={{
              width: "100%",
              maxWidth: "500px",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => navigate("/home")} sx={headerNavButtonStyle}>
              <HomeIcon />
            </Button>
            <Button onClick={() => navigate("/search")} sx={headerNavButtonStyle}>
              <PersonSearchIcon />
            </Button>
            <Button onClick={handleOpenSettings} sx={headerNavButtonStyle}>
              <PermDataSettingIcon />
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 3. CONTEÚDO CENTRAL DO PERFIL */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", width: "100%" }}>
        <Container
          maxWidth="md"
          sx={{ pt: { xs: 5, md: 8 }, pb: 10, px: 2 }}
        >
          {/* Bloco de Informações do Usuário */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 6,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                borderRadius: "50%",
                padding: "4px",
                background: "linear-gradient(135deg, var(--accent-purple, #a855f7), var(--accent-color, #db2777))",
                mb: 2.5,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <Avatar
                src={
                  avatar && avatar.trim() !== ""
                    ? `http://localhost:3333/uploads/${avatar}?v=${avatarVersion}`
                    : undefined
                }
                onClick={() => setIsModalOpen(true)}
                sx={{
                  width: { xs: 110, md: 140 },
                  height: { xs: 110, md: 140 },
                  cursor: "pointer",
                  border: "4px solid #050505",
                  backgroundColor: "#111",
                  fontSize: "2.5rem",
                  fontWeight: "800",
                }}
              >
                {userName ? userName.charAt(0).toUpperCase() : "?"}
              </Avatar>
            </Box>

            <Typography
              variant="h4"
              fontWeight="900"
              sx={{
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                letterSpacing: "-0.5px",
                color: "#fff",
              }}
            >
              {userName || "..."}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.4)", mt: 0.5, fontWeight: 500 }}
            >
              @{userName?.toLowerCase().replace(/\s+/g, "") || "usuario"}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 5 }} />

          {/* Feed de Posts do Usuário */}
          <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 3, px: 0.5, color: "rgba(255,255,255,0.9)" }}>
            Suas publicações ({posts.length})
          </Typography>

          {posts.length === 0 ? (
            <Typography textAlign="center" color="gray" sx={{ mt: 6, fontSize: "0.95rem" }}>
              Você ainda não realizou nenhuma publicação.
            </Typography>
          ) : (
            <Grid container spacing={3} alignItems="stretch">
              {posts.map((post) => (
                <Grid item xs={12} sm={6} key={post.id} sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#0d0d0d",
                      borderRadius: "18px",
                      width: "100%",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.05)",
                      transition: "border-color 0.2s ease-in-out, transform 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: "rgba(255, 255, 255, 0.12)",
                        transform: "translateY(-4px)"
                      },
                    }}
                  >
                    {/* 1. IMAGEM NO TOPO (Apenas renderiza se existir) */}
                    {post.contentImage && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "200px",
                          backgroundColor: "#050505",
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                        }}
                      >
                        <Box
                          component="img"
                          src={`http://localhost:3333/uploads/${post.contentImage}`}
                          alt={post.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    )}

                    {/* 2. CONTEÚDO E TEXTOS ABAIXO DA IMAGEM */}
                    <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <Box>
                        {/* Informações da marca/usuário + Botão de deletar */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                          }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                              src={avatar && avatar.trim() !== "" ? `http://localhost:3333/uploads/${avatar}?v=${avatarVersion}` : undefined}
                              sx={{ width: 20, height: 20, fontSize: "0.6rem", fontWeight: "700" }}
                            >
                              {userName ? userName.charAt(0).toUpperCase() : "?"}
                            </Avatar>
                            <Typography variant="caption" color="rgba(255,255,255,0.4)" fontWeight="600">
                              {userName || "Sua publicação"}
                            </Typography>
                          </Stack>

                          <Tooltip title="Excluir post">
                            <IconButton
                              onClick={() => handleOpenDelete(post.id)}
                              size="small"
                              sx={{
                                color: "rgba(255, 255, 255, 0.3)",
                                padding: "4px",
                                "&:hover": {
                                  color: "#ef4444",
                                  backgroundColor: "rgba(239, 68, 68, 0.08)"
                                },
                              }}
                            >
                              <DeleteSweepIcon sx={{ fontSize: "1rem" }} />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        {/* Título do Card */}
                        <Typography
                          variant="subtitle1"
                          fontWeight="700"
                          color="#fff"
                          sx={{
                            lineHeight: 1.3,
                            mb: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.title}
                        </Typography>

                        {/* Texto complementar do card */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(255, 255, 255, 0.5)",
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.contentText}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Modais */}
      <ExcludeModal
        open={isExcludeModalOpen}
        onClose={() => setIsExcludeModalOpen(false)}
        postId={selectedPostId}
        onDeleted={handlePostDeleted}
      />

      <AvatarModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        onAvatarUpdated={(newAvatar) => {
          setAvatar(newAvatar);
          setAvatarVersion((prev) => prev + 1);
          fetchUser();
        }}
      />

      <SettingsModal open={openSettings} handleClose={handleCloseSettings} />
    </Box>
  );
};