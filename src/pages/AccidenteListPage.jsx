import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAccidente, getAccidentes } from "../api/accidentes";

export default function AccidenteListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const cargar = async () => {
    try {
      setError("");
      const data = await getAccidentes();
      setItems(data);
    } catch (e) {
      setError(e.message || "Error cargando accidentes");
    }
  };

  useEffect(() => { cargar(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar accidente?")) return;
    try {
      await deleteAccidente(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      alert(e.message || "Error eliminando");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Accidentes</h3>
        <Link to="/accidentes/nuevo" className="btn btn-primary">Nuevo</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Gravedad</th>
            <th>Lugar</th>
            <th>Licencia</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a.id}>
              <td>{a.fecha}</td>
              <td>{a.tipo}</td>
              <td>{a.gravedad}</td>
              <td>{a.lugar}</td>
              <td>{a.requiere_licencia ? "SI" : "NO"}</td>
              <td className="text-end">
                <Link className="btn btn-sm btn-secondary me-2" to={`/accidentes/${a.id}`}>Editar</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="6" className="text-center">Sin registros</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
