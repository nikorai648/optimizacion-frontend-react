import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEficiencia, getEficiencias } from "../api/eficiencias";

export default function EficienciaListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setError("");
      const data = await getEficiencias();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Error cargando eficiencias");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar eficiencia?")) return;
    try {
      await deleteEficiencia(id);
      setItems((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Error eliminando");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card-page">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <img
              src="/img/eficiencia.jpg"
              className="icono-listado"
              alt="Eficiencias"
            />
            <h3 className="mb-0">Eficiencias</h3>
          </div>

          <Link to="/eficiencias/nueva" className="btn btn-primary">
            Nueva
          </Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre</th>
              <th>ID</th>
              <th>Trabajos/mes</th>
              <th>Sueldo prom.</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x.id}>
                <td>{x.trabajador_rut}</td>
                <td>{x.trabajador_nombre}</td>
                <td>{x.id_eficiencia}</td>
                <td>{x.trabajos_completados_en_1_mes}</td>
                <td>{x.sueldo_promedio_informado}</td>
                <td className="text-end">
                  <Link
                    className="btn btn-sm btn-secondary me-2"
                    to={`/eficiencias/${x.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(x.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
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
