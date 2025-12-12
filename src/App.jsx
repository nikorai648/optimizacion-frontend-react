// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import TrabajadorListPage from "./pages/TrabajadorListPage";
import TrabajadorFormPage from "./pages/TrabajadorFormPage";

import AsistenciaListPage from "./pages/AsistenciaListPage";
import AsistenciaFormPage from "./pages/AsistenciaFormPage";

import AccidenteListPage from "./pages/AccidenteListPage";
import AccidenteFormPage from "./pages/AccidenteFormPage";

import EficienciaListPage from "./pages/EficienciaListPage";
import EficienciaFormPage from "./pages/EficienciaFormPage";

import DesempenoListPage from "./pages/DesempenoListPage";
import DesempenoFormPage from "./pages/DesempenoFormPage";

import SueldoListPage from "./pages/SueldoListPage";
import SueldoFormPage from "./pages/SueldoFormPage";

export const AuthContext = React.createContext(null);

export default function App() {
  const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  });

  const login = (token, username) => {
    setAuth({
      isAuthenticated: true,
      token,
      username,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      username: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {auth.isAuthenticated && <Navbar />}

      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* HOME */}
        <Route
          path="/"
          element={auth.isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* TRABAJADORES */}
        <Route path="/trabajadores" element={auth.isAuthenticated ? <TrabajadorListPage /> : <Navigate to="/login" />} />
        <Route path="/trabajadores/nuevo" element={auth.isAuthenticated ? <TrabajadorFormPage /> : <Navigate to="/login" />} />
        <Route path="/trabajadores/:id" element={auth.isAuthenticated ? <TrabajadorFormPage /> : <Navigate to="/login" />} />

        {/* ASISTENCIAS */}
        <Route path="/asistencias" element={auth.isAuthenticated ? <AsistenciaListPage /> : <Navigate to="/login" />} />
        <Route path="/asistencias/nueva" element={auth.isAuthenticated ? <AsistenciaFormPage /> : <Navigate to="/login" />} />
        <Route path="/asistencias/:id" element={auth.isAuthenticated ? <AsistenciaFormPage /> : <Navigate to="/login" />} />

        {/* ACCIDENTES */}
        <Route path="/accidentes" element={auth.isAuthenticated ? <AccidenteListPage /> : <Navigate to="/login" />} />
        <Route path="/accidentes/nuevo" element={auth.isAuthenticated ? <AccidenteFormPage /> : <Navigate to="/login" />} />
        <Route path="/accidentes/:id" element={auth.isAuthenticated ? <AccidenteFormPage /> : <Navigate to="/login" />} />

        {/* EFICIENCIAS */}
        <Route path="/eficiencias" element={auth.isAuthenticated ? <EficienciaListPage /> : <Navigate to="/login" />} />
        <Route path="/eficiencias/nueva" element={auth.isAuthenticated ? <EficienciaFormPage /> : <Navigate to="/login" />} />
        <Route path="/eficiencias/:id" element={auth.isAuthenticated ? <EficienciaFormPage /> : <Navigate to="/login" />} />

        {/* DESEMPEÑO */}
        <Route path="/desempenos" element={auth.isAuthenticated ? <DesempenoListPage /> : <Navigate to="/login" />} />
        <Route path="/desempenos/nuevo" element={auth.isAuthenticated ? <DesempenoFormPage /> : <Navigate to="/login" />} />
        <Route path="/desempenos/:id" element={auth.isAuthenticated ? <DesempenoFormPage /> : <Navigate to="/login" />} />

        {/* SUELDOS */}
        <Route path="/sueldos" element={auth.isAuthenticated ? <SueldoListPage /> : <Navigate to="/login" />} />
        <Route path="/sueldos/nuevo" element={auth.isAuthenticated ? <SueldoFormPage /> : <Navigate to="/login" />} />
        <Route path="/sueldos/:id" element={auth.isAuthenticated ? <SueldoFormPage /> : <Navigate to="/login" />} />

      </Routes>
    </AuthContext.Provider>
  );
}
