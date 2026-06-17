import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsers } from "../api/users/users";
import type { IUserResponse } from "../api/types/users.type";

export const SearchUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUserResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function getUsersBySystem() {
      try {
        setLoading(true);
        const { data } = await getUsers();
        if (isMounted) setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getUsersBySystem();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtra os usuários dinamicamente por nome ou username
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.name?.toLowerCase().includes(searchLower)
    );
  });

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
      {/* Header Sticky / Barra Superior */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(10, 10, 10, 0.8)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          py: 2,
        }}
      >
        <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/home")}
            sx={{
              color: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              transition: "0.2s",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "translateX(-2px)",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: "-0.5px" }}>
            Buscar Pessoas
          </Typography>
        </Container>
      </Box>

      {/* Conteúdo Centralizado */}
      <Container maxWidth="sm" sx={{ mt: 4, px: 2, pb: 6 }}>
        {/* Input de Busca Estilizado */}
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Procure por nome ou @username..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              backgroundColor: "#111",
              borderRadius: "16px",
              paddingLeft: "15px",
              transition: "all 0.3s ease",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              "& fieldset": { border: "none" },
              "&:hover": {
                backgroundColor: "#161616",
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.15)",
              },
              "&.Mui-focused": {
                backgroundColor: "#111",
                boxShadow: "0 0 0 2px var(--accent-purple, #a855f7)",
              },
            },
          }}
        />

        {/* Estado de Carregamento */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
            <CircularProgress size={30} sx={{ color: "var(--accent-purple, #a855f7)" }} />
          </Box>
        ) : filteredUsers.length === 0 ? (
          /* Estado Vazio */
          <Typography textAlign="center" color="gray" sx={{ mt: 6, fontSize: "0.95rem" }}>
            Nenhum usuário encontrado.
          </Typography>
        ) : (
          /* Lista Amigável de Usuários */
          <List sx={{ display: "flex", flexDirection: "column", gap: 1, p: 0 }}>
            {filteredUsers.map((user) => (
              <ListItem
                key={user.id}
                onClick={() => navigate(`/profile/${user.id}`)} // Navega ao clicar
                sx={{
                  borderRadius: "16px",
                  backgroundColor: "#111",
                  border: "1px solid rgba(255, 255, 255, 0.02)",
                  padding: "12px 16px",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#161616",
                    transform: "translateY(-1px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <ListItemAvatar sx={{ minWidth: "56px" }}>
                  <Avatar
                    alt={user.name}
                    src={user.avatar ? `http://localhost:3333/uploads/${user.avatar}` : undefined}
                    sx={{
                      width: 44,
                      height: 44,
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "700", fontSize: "0.95rem", color: "#fff" }}>
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem", mt: 0.2 }}>
                      @{user.name || user.name?.toLowerCase().replace(/\s+/g, "")}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </Box>
  );
};