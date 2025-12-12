import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAsistencias,
  deleteAsistencia,
} from "../api/asistencias";

export default function AsistenciaListPage() {
  const [asistencias, setAsistencias] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await getAsistencias();
      setAsistencias(data);
    } catch {
      setError("No se pudieron cargar las asistencias");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar asistencia?")) return;

    try {
      await deleteAsistencia(id);
      cargar();
    } catch {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Asistencias</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <Link to="/asistencias/nueva" className="btn btn-primary mb-3">
        Nueva Asistencia
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Trabajador</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map((a) => (
            <tr key={a.id}>
              <td>{a.trabajador_nombre || a.trabajador}</td>
              <td>{a.fecha}</td>
              <td>{a.estado}</td>
              <td>
                <Link
                  className="btn btn-sm btn-warning me-2"
                  to={`/asistencias/${a.id}`}
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminar(a.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {asistencias.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                Sin asistencias registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
