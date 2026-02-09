import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import { Home } from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Auth/Register";
import { Profile } from "../pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Privadas */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
