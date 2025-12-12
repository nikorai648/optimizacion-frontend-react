import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAccidente,
  getAccidente,
  updateAccidente,
} from "../api/accidentes";
import { getTrabajadores } from "../api/trabajadores";

const initialForm = {
  trabajador: "",
  fecha: "",
  descripcion: "",
  gravedad: "LEVE",   // ajusta si tu modelo usa otro nombre / choices
};

export default function AccidenteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar trabajadores para el select
    getTrabajadores()
      .then(setTrabajadores)
      .catch(() => setError("No se pudieron cargar trabajadores"));

    // Si es edición, cargar datos del accidente
    if (esEditar) {
      getAccidente(id)
        .then((data) => {
          // Asegúrate que data tenga las mismas claves que initialForm
          setForm({
            trabajador: data.trabajador,
            fecha: data.fecha,
            descripcion: data.descripcion,
            gravedad: data.gravedad,
          });
        })
        .catch(() => setError("No se pudo cargar el accidente"));
    }
  }, [id, esEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (esEditar) {
        await updateAccidente(id, form);
      } else {
        await createAccidente(form);
      }
      navigate("/accidentes");
    } catch {
      setError("Error al guardar accidente");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Accidente" : "Nuevo Accidente"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Trabajador</label>
          <select
            name="trabajador"
            className="form-select"
            value={form.trabajador}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            {trabajadores.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre} {t.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gravedad</label>
          <select
            name="gravedad"
            className="form-select"
            value={form.gravedad}
            onChange={handleChange}
          >
            <option value="LEVE">Leve</option>
            <option value="MODERADO">Moderado</option>
            <option value="GRAVE">Grave</option>
          </select>
        </div>

        <button className="btn btn-success me-2">Guardar</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/accidentes")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
