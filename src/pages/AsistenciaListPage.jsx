import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAsistencias, deleteAsistencia } from "../api/asistencias";

export default function AsistenciaListPage() {
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAsistencias();
      setAsistencias(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las asistencias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar asistencia?")) return;
    setError("");
    try {
      await deleteAsistencia(id);
      setAsistencias((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Asistencias</h3>
        <Link to="/asistencias/nueva" className="btn btn-primary">
          Nueva Asistencia
        </Link>
      </div>

      {loading && <div>Cargando...</div>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Trabajador</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map((a) => (
              <tr key={a.id}>
                <td>{a.trabajador_nombre || a.trabajador_rut || a.trabajador}</td>
                <td>{a.fecha}</td>
                <td>{a.estado || a.tipo_jornada}</td>
                <td className="text-end">
                  <Link className="btn btn-sm btn-warning me-2" to={`/asistencias/${a.id}`}>
                    Editar
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(a.id)}>
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
      )}
    </div>
  );
}
