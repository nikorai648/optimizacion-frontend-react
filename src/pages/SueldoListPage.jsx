import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteSueldo, getSueldos } from "../api/sueldos";

export default function SueldoListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setError("");
      setItems(await getSueldos());
    } catch (e) {
      setError(e.message || "Error cargando sueldos");
    }
  };

  useEffect(() => { cargar(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar sueldo?")) return;
    try {
      await deleteSueldo(id);
      setItems((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Error eliminando");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Sueldos</h3>
        <Link to="/sueldos/nuevo" className="btn btn-primary">Nuevo</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Mes</th>
            <th>Trabajos</th>
            <th>Total</th>
            <th>ID Efic.</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => (
            <tr key={x.id}>
              <td>{x.trabajador_rut}</td>
              <td>{x.trabajador_nombre}</td>
              <td>{x.mes}</td>
              <td>{x.cantidad_trabajos_mes}</td>
              <td>{x.sueldo_total_mes}</td>
              <td>{x.id_eficiencia_asociada ?? ""}</td>
              <td className="text-end">
                <Link className="btn btn-sm btn-secondary me-2" to={`/sueldos/${x.id}`}>Editar</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(x.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="7" className="text-center">Sin registros</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
