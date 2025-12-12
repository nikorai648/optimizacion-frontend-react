// src/pages/DesempenoListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDesempenos,
  deleteDesempeno,
} from "../api/desempenos";

export default function DesempenoListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await getDesempenos();
      setItems(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los desempeños");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este registro de desempeño?")) return;
    try {
      await deleteDesempeno(id);
      setItems((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar desempeño");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Desempeño de Trabajadores</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <Link className="btn btn-primary" to="/desempenos/nuevo">
          Nuevo
        </Link>
      </div>

      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>ID Desempeño</th>
            <th>Forma de hacer trabajos</th>
            <th>Posibles quejas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.id}>
              <td>{d.trabajador_rut}</td>
              <td>{d.trabajador_nombre}</td>
              <td>{d.id_desempeno}</td>
              <td>{d.forma_de_hacer_trabajos}</td>
              <td>{d.posibles_quejas}</td>
              <td>
                <Link
                  className="btn btn-sm btn-secondary me-2"
                  to={`/desempenos/${d.id}`}
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(d.id)}
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
  );
}
