import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSueldos, deleteSueldo } from "../api/sueldos";

export default function SueldoListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      const data = await getSueldos();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("No se pudieron cargar sueldos");
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar sueldo?")) return;
    await deleteSueldo(id);
    cargar();
  };

  return (
    <div className="container mt-4">
      <h3>Sueldos</h3>

      <Link to="/sueldos/nuevo" className="btn btn-primary mb-3">
        Nuevo
      </Link>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Mes</th>
            <th>Sueldo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr key={s.id}>
              <td>{s.trabajador_rut}</td>
              <td>{s.trabajador_nombre}</td>
              <td>{s.mes}</td>
              <td>${s.sueldo_total_mes}</td>
              <td className="text-end">
                <Link to={`/sueldos/${s.id}`} className="btn btn-sm btn-secondary me-2">
                  Editar
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminar(s.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="5">Sin registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
