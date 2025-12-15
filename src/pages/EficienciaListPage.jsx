import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEficiencias, deleteEficiencia } from "../api/eficiencias";

export default function EficienciaListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargar = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getEficiencias();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las eficiencias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar eficiencia?")) return;
    try {
      await deleteEficiencia(id);
      setItems((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Error al eliminar eficiencia");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Eficiencia</h3>
        <Link to="/eficiencias/nueva" className="btn btn-primary">
          Nueva
        </Link>
      </div>

      {loading && <div>Cargando...</div>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>ID</th>
              <th>Trabajos (1 mes)</th>
              <th>Sueldo promedio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td>{e.trabajador_rut}</td>
                <td>{e.trabajador_nombre}</td>
                <td>{e.id_eficiencia}</td>
                <td>{e.trabajos_completados_en_1_mes}</td>
                <td>{e.sueldo_promedio_informado}</td>
                <td className="text-end">
                  <Link
                    className="btn btn-sm btn-secondary me-2"
                    to={`/eficiencias/${e.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminar(e.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="6">Sin registros</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
