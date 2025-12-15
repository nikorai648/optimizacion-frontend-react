import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccidentes, deleteAccidente } from "../api/accidentes";

export default function AccidenteListPage() {
  const [accidentes, setAccidentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAccidentes();
      setAccidentes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los accidentes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar accidente?")) return;
    setError("");
    try {
      await deleteAccidente(id);
      setAccidentes((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar accidente");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Accidentes</h3>
        <Link to="/accidentes/nuevo" className="btn btn-primary">
          Nuevo Accidente
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
              <th>Tipo / Descripción</th>
              <th>Gravedad</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {accidentes.map((a) => (
              <tr key={a.id}>
                <td>{a.trabajador_nombre || a.trabajador_rut || a.trabajador}</td>
                <td>{a.fecha}</td>
                <td>{a.tipo || a.descripcion || a.tipo_accidente}</td>
                <td>{a.gravedad}</td>
                <td className="text-end">
                  <Link className="btn btn-sm btn-warning me-2" to={`/accidentes/${a.id}`}>
                    Editar
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(a.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {accidentes.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Sin accidentes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
