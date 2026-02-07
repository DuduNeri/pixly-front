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
import { loginUser } from "../../api/auth/autentication";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function login(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await loginUser(name, password);
      navigate("/home");
      console.log(response.data.token)
      return response
    } catch (error) {
      console.log("❌ Erro ao logar:", error);
      alert("Nome de usuário ou senha incorretos!");
    }
 
  }

  return (
    <AuthLayout>
      <Typography variant="h4" textAlign="center" mb={2} sx={{ color: "#fff" }}>
        Login
      </Typography>

      <form onSubmit={login}>
        {/* Nome de usuário */}
        <TextField
          fullWidth
          label="Nome de usuário"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        {/* Botão Entrar */}
        <Button
          fullWidth
          type="submit"
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
          Entrar
        </Button>
      </form>

      {/* Link Register */}
      <Typography
        onClick={() => navigate("/register")}
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
        Não tem uma conta? Cadastre-se
      </Typography>
    </AuthLayout>
  );
}
