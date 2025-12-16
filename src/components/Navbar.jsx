// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* LOGO + TITULO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/img/logo-carran.jpg"
            alt="Logo Constructora Carrán"
            className="logo-navbar me-2"
          />
          Optimización y Logística
        </Link>

        {/* BOTÓN MÓVIL */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/trabajadores">Trabajadores</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/asistencias">Asistencias</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/accidentes">Accidentes</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/eficiencias">Eficiencia</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/desempenos">Desempeño</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/sueldos">Sueldos</NavLink></li>
          </ul>

          {/* USUARIO */}
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <span className="navbar-text text-white me-3">
                Hola, {auth.username}
              </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-light btn-sm" onClick={handleLogout}>
                Salir
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
