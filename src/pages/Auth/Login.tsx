import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
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
      console.log(response.data.token);
      return response;
    } catch (error) {
      console.log("❌ Erro ao logar:", error);
      alert("Nome de usuário ou senha incorretos!");
    }
  }

  const textFieldStyle = {
    mb: 2.5,
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.4)",
      "&.Mui-focused": {
        color: "var(--accent-purple, #a855f7)",
      },
    },
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      backgroundColor: "#111",
      borderRadius: "16px",
      transition: "all 0.3s ease",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      "& fieldset": { border: "none" },
      "&:hover": {
        backgroundColor: "#161616",
        boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.15)",
      },
      "&.Mui-focused": {
        backgroundColor: "#0d0d0d",
        boxShadow: "0 0 0 2px var(--accent-purple, #a855f7)",
      },
    },
  };

  return (
    <AuthLayout>
      {/* Cabeçalho do Login */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight="900"
          sx={{
            letterSpacing: "-1px",
            background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Bem-vindo de volta! 
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.4)", mt: 1 }}>
          Acesse sua conta
        </Typography>
      </Box>

      <form onSubmit={login}>
        {/* Nome de usuário */}
        <TextField
          fullWidth
          label="Nome de usuário"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={textFieldStyle}
        />

        {/* Senha com olho */}
        <TextField
          fullWidth
          label="Senha"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={textFieldStyle}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: 0.5 }}>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{
                    color: "rgba(255, 255, 255, 0.3)",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Botão Entrar */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1f2937",
            color: "#fff",
            fontWeight: "700",
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "16px",
            padding: "14px 0",
            boxShadow: "0 8px 24px rgba(31, 41, 55, 0.2)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: "#2d3748",
              transform: "translateY(-1px)",
              boxShadow: "0 12px 28px rgba(31, 41, 55, 0.3)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
        >
          Entrar
        </Button>
      </form>

      {/* Link de Cadastro */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography
          onClick={() => navigate("/register")}
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            cursor: "pointer",
            fontWeight: "500",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "var(--accent-pink, #db2777)",
              textDecoration: "underline",
            },
          }}
        >
          Não tem uma conta? <span style={{ fontWeight: "700" }}>Cadastre-se</span>
        </Typography>
      </Box>
    </AuthLayout>
  );
}