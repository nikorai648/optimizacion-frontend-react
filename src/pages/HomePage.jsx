// src/pages/HomePage.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const cards = [
  {
    title: "Trabajadores",
    desc: "Gestión de personal: crear, editar y eliminar trabajadores.",
    to: "/trabajadores",
    img: "/img/trabajador.jpg",
    alt: "Trabajadores",
  },
  {
    title: "Asistencias",
    desc: "Registro de asistencia, atrasos, horas extra y estado.",
    to: "/asistencias",
    img: "/img/asistencia.webp",
    alt: "Asistencias",
  },
  {
    title: "Accidentes",
    desc: "Registro de accidentes, gravedad, licencia y trabajadores involucrados.",
    to: "/accidentes",
    img: "/img/accidente.webp",
    alt: "Accidentes",
  },
  {
    title: "Eficiencia",
    desc: "Control de eficiencia mensual por trabajador.",
    to: "/eficiencias",
    img: "/img/eficiencia.jpeg",
    alt: "Eficiencia",
  },
  {
    title: "Desempeño",
    desc: "Seguimiento de desempeño y observaciones.",
    to: "/desempenos",
    img: "/img/desempeno.jpg",
    alt: "Desempeño",
  },
  {
    title: "Sueldos",
    desc: "Cálculo de sueldos mensuales y vínculo con eficiencia.",
    to: "/sueldos",
    img: "/img/sueldo.webp",
    alt: "Sueldos",
  },
];

export default function HomePage() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="dashboard-hero p-4 p-md-5 rounded-4 shadow-sm mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h2 className="mb-1">Panel de Control</h2>
            <p className="mb-0 text-muted">
              Bienvenido{auth?.username ? `, ${auth.username}` : ""}. Selecciona un módulo para continuar.
            </p>
          </div>

          {/* Logo a la derecha */}
          <img
            src="/img/logo-carran.jpg"
            alt="Logo Constructora Carrán"
            className="dashboard-logo"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="row g-4">
        {cards.map((c) => (
          <div className="col-12 col-sm-6 col-lg-4" key={c.to}>
            <Link to={c.to} className="text-decoration-none">
              <div className="card dashboard-card h-100 shadow-sm">
                <div className="dashboard-card-imgwrap">
                  <img src={c.img} alt={c.alt} className="dashboard-card-img" />
                </div>

                <div className="card-body">
                  <h5 className="card-title mb-2">{c.title}</h5>
                  <p className="card-text text-muted mb-3">{c.desc}</p>

                  <div className="d-flex justify-content-end">
                    <span className="btn btn-primary btn-sm">Entrar</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
