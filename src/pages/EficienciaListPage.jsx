// src/pages/EficienciaListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getEficiencias,
  deleteEficiencia,
} from "../api/eficiencias";

export default function EficienciaListPage() {
  const [eficiencias, setEficiencias] = useState([]);
  const [error, setError] = useState("");

  const cargar = () => {
    getEficiencias()
      .then((data) => setEficiencias(data))
      .catch(() => setError("No se pudieron cargar las eficiencias"));
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar registro de eficiencia?")) return;
    try {
      await deleteEficiencia(id);
      cargar();
    } catch (e) {
      setError("Error eliminando eficiencia");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Eficiencia de Trabajadores</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <Link className="btn btn-primary" to="/eficiencias/nueva">
          Nueva Eficiencia
        </Link>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>RUT Trabajador</th>
            <th>Nombre</th>
            <th>ID Eficiencia</th>
            <th>Trabajos en 1 mes</th>
            <th>Sueldo promedio informado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eficiencias.map((e) => (
            <tr key={e.id}>
              <td>{e.trabajador_rut}</td>
              <td>{e.trabajador_nombre}</td>
              <td>{e.id_eficiencia}</td>
              <td>{e.trabajos_completados_en_1_mes}</td>
              <td>{e.sueldo_promedio_informado}</td>
              <td>
                <Link
                  className="btn btn-sm btn-link"
                  to={`/eficiencias/${e.id}`}
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => handleDelete(e.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {eficiencias.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                Sin registros de eficiencia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
