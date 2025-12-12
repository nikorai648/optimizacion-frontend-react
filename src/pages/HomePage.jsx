// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mt-5">
      <h1>Opciones del Sistema</h1>
      <p>Sistema de Trabajadores, Asistencias y Accidentes.</p>

      <ul>
        <li>
          <Link to="/trabajadores">Trabajadores</Link>
        </li>
        <li>
          <Link to="/asistencias">Asistencias</Link>
        </li>
        <li>
          <Link to="/accidentes">Accidentes</Link>
        </li>
        <li>
          <Link to="/eficiencias">Eficiencia de Trabajadores</Link>
        </li>
        <li>
          <Link to="/desempenos">Desempeño de Trabajadores</Link>
        </li>
        <li>
          <Link to="/sueldos">Sueldos</Link>
        </li>
      </ul>
    </div>
  );
}
