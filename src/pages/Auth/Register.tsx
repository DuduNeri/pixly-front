import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { register } from "../../api/auth/autentication";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

async function registerUser(e: React.FormEvent) {
  e.preventDefault();
  try {
    if (!name || !email || !password) {
      return alert("Todos os campos são obrigatórios");
    }

    const data = await register(name, email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userName", data.user.name);

    console.log("TOKEN SALVO:", data.token);

    navigate("/home");
  } catch (error) {
    console.log("❌ Erro ao registrar:", error);
  }
}


  return (
    <AuthLayout>
      <Typography variant="h4" textAlign="center" mb={2} sx={{ color: "#fff" }}>
        Criar conta
      </Typography>

      {/* Nome */}
      <TextField
        fullWidth
        label="Nome"
        margin="normal"
        onChange={(e) => setName(e.target.value)}
        sx={{
          "& label": { color: "#09daff" },
          "& .MuiInputBase-input": { color: "#fff" },
        }}
      />

      {/* Email */}
      <TextField
        fullWidth
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        sx={{
          "& label": { color: "#09daff" },
          "& .MuiInputBase-input": { color: "#fff" },
        }}
      />

      {/* Senha com olho */}
      <TextField
        fullWidth
        label="Senha"
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        sx={{
          "& label": { color: "#09daff" },
          "& .MuiInputBase-input": { color: "#fff" },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  color: "#09daff",
                  "&:hover": {
                    color: "#22d3ee",
                    filter: "drop-shadow(0 0 6px #22d3ee)",
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Botão */}
      <Button
        onClick={(e) => {
          registerUser(e);
        }}
        fullWidth
        sx={{
          mt: 2,
          background: "linear-gradient(135deg, #0f172a, #1e293b, #0f172a)",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "12px",
          padding: "12px 0",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          transition: "all 0.4s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #22d3ee, #3b82f6, #9333ea)",
            transform: "translateY(-1px) scale(1.02)",
            boxShadow: "0 0 25px rgba(59,130,246,0.6)",
          },
        }}
      >
        Criar conta
      </Button>

      {/* Link Login */}
      <Typography
        onClick={() => navigate("/login")}
        sx={{
          fontSize: 15,
          mt: 3,
          cursor: "pointer",
          transition: "all 0.4s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #22d3ee, #3b82f6, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        }}
      >
        Já tem uma conta? Faça login
      </Typography>
    </AuthLayout>
  );
}
