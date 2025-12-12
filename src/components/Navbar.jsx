// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Optimizacion y Logistica
      </Link>

      <div className="navbar-nav me-auto">

  <Link className="nav-link" to="/trabajadores">Trabajadores</Link>
  <Link className="nav-link" to="/asistencias">Asistencias</Link>
  <Link className="nav-link" to="/accidentes">Accidentes</Link>
  <Link className="nav-link" to="/eficiencias">Eficiencia</Link>
  <Link className="nav-link" to="/desempenos">Desempeño</Link>
  <Link className="nav-link" to="/sueldos">Sueldos</Link>

</div>
      <span className="navbar-text text-white me-3">
        Hola, {auth.username}
      </span>

      <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
        Salir
      </button>
    </nav>
  );
}

