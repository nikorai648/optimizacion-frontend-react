// src/pages/SueldoListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSueldos, deleteSueldo } from "../api/sueldos";

export default function SueldoListPage() {
  const [sueldos, setSueldos] = useState([]);
  const [error, setError] = useState("");

  const cargar = () => {
    setError("");
    getSueldos()
      .then((data) => setSueldos(data))
      .catch(() => setError("No se pudieron cargar los sueldos"));
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar registro de sueldo?")) return;
    try {
      await deleteSueldo(id);
      cargar();
    } catch (err) {
      setError("No se pudo eliminar el sueldo");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Sueldos Trabajadores</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <Link to="/sueldos/nuevo" className="btn btn-primary btn-sm">
          Nuevo
        </Link>
      </div>

      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Mes</th>
            <th>Trabajos Mes</th>
            <th>Sueldo Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sueldos.map((s) => (
            <tr key={s.id}>
              <td>{s.trabajador_rut}</td>
              <td>{s.trabajador_nombre}</td>
              <td>{s.mes}</td>
              <td>{s.cantidad_trabajos_mes}</td>
              <td>${s.sueldo_total_mes}</td>
              <td>
                <Link
                  to={`/sueldos/${s.id}`}
                  className="btn btn-link btn-sm"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {sueldos.length === 0 && (
            <tr>
              <td colSpan="6">Sin registros aún.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
