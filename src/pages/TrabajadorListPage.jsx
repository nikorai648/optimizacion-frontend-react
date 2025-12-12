import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrabajadores, deleteTrabajador } from "../api/trabajadores";

export default function TrabajadorListPage() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await getTrabajadores();
      setTrabajadores(data);
    } catch (err) {
      setError("Error cargando trabajadores");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar trabajador?")) return;
    await deleteTrabajador(id);
    cargar();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Trabajadores</h3>
        <Link className="btn btn-primary" to="/trabajadores/nuevo">
          Nuevo
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Turno</th>
            <th>Tipo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.length === 0 && (
            <tr>
              <td colSpan="5">Sin registros</td>
            </tr>
          )}
          {trabajadores.map((t) => (
            <tr key={t.id}>
              <td>{t.rut}</td>
              <td>
                {t.nombre} {t.apellido}
              </td>
              <td>{t.turno}</td>
              <td>{t.tipo}</td>
              <td className="text-end">
                <Link
                  className="btn btn-sm btn-secondary me-2"
                  to={`/trabajadores/${t.id}`}
                >
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(t.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
