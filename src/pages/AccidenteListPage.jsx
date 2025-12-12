import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAccidentes,
  deleteAccidente,
} from "../api/accidentes";

export default function AccidenteListPage() {
  const [accidentes, setAccidentes] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await getAccidentes();
      setAccidentes(data);
    } catch {
      setError("No se pudieron cargar los accidentes");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar accidente?")) return;

    try {
      await deleteAccidente(id);
      cargar();
    } catch {
      alert("Error al eliminar accidente");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Accidentes</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <Link to="/accidentes/nuevo" className="btn btn-primary mb-3">
        Nuevo Accidente
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Trabajador</th>
            <th>Fecha</th>
            <th>Tipo / Descripción</th>
            <th>Gravedad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accidentes.map((a) => (
            <tr key={a.id}>
              <td>{a.trabajador_nombre || a.trabajador}</td>
              <td>{a.fecha}</td>
              <td>{a.descripcion || a.tipo_accidente}</td>
              <td>{a.gravedad}</td>
              <td>
                <Link
                  className="btn btn-sm btn-warning me-2"
                  to={`/accidentes/${a.id}`}
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

          {accidentes.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                Sin accidentes registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
