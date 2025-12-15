import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAsistencias, deleteAsistencia } from "../api/asistencias";

export default function AsistenciaListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setError("");
      const data = await getAsistencias();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "No se pudieron cargar las asistencias");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar asistencia?")) return;
    try {
      await deleteAsistencia(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Error al eliminar");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card-page">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <img
              src="/img/asistencia.webp"
              className="icono-listado"
              alt="Asistencias"
            />
            <h3 className="mb-0">Asistencias</h3>
          </div>

          <Link to="/asistencias/nueva" className="btn btn-primary">
            Nueva
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a.id}>
                <td>{a.trabajador_rut}</td>
                <td>{a.trabajador_nombre}</td>
                <td>{a.fecha}</td>
                <td>{a.estado}</td>
                <td className="text-end">
                  <Link
                    className="btn btn-sm btn-secondary me-2"
                    to={`/asistencias/${a.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(a.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
