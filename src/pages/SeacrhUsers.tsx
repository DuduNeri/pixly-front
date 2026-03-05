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
  Button,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getUsers } from "../api/users/users";
import { useEffect, useState } from "react";
import type { IUserResponse } from "../api/types/users.type";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const SearchUsers = () => {
  const [users, setUsers] = useState<IUserResponse[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function getUsersBySistem() {
      try {
        const { data } = await getUsers();
        if (isMounted) setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    }
    getUsersBySistem();
    return () => {
      isMounted = false;
    };
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
      sx={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      {/* Container da Busca */}
      <Box sx={{ width: "100%", maxWidth: "500px", px: 2 }}>
        <Button onClick={() => navigate("/home")} sx={pinkButtonStyle}>
          <ArrowBackIcon />
        </Button>
        <Typography variant="h5" sx={{ mb: 5, mt: 3, fontWeight: "bold" }}>
          Buscar Usuários
        </Typography>

        <TextField
          fullWidth
          placeholder="Procure por nome ou @username..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              "& fieldset": { borderColor: "#333" },
              "&:hover fieldset": { borderColor: "#555" },
              "&.Mui-focused fieldset": { borderColor: "#90caf9" },
            },
          }}
        />

        {/* Lista de Resultados */}
        <List sx={{ mt: 2 }}>
          {users.map((users) => (
            <Box key={users.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#141414" },
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={users.name} sx={{ bgcolor: "#333" }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: "600" }}>
                      {users.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      {users.name}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider
                variant="inset"
                component="li"
                sx={{ borderColor: "#222" }}
              />
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};
