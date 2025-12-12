import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAsistencia,
  getAsistencia,
  updateAsistencia,
} from "../api/asistencias";
import { getTrabajadores } from "../api/trabajadores";

export default function AsistenciaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [trabajadores, setTrabajadores] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    trabajador: "",
    fecha: "",
    estado: "PRESENTE",
  });

  useEffect(() => {
    getTrabajadores().then(setTrabajadores);

    if (esEditar) {
      getAsistencia(id).then(setForm);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      esEditar
        ? await updateAsistencia(id, form)
        : await createAsistencia(form);
      navigate("/asistencias");
    } catch {
      setError("Error al guardar asistencia");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Asistencia" : "Nueva Asistencia"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Trabajador</label>
          <select
            name="trabajador"
            className="form-control"
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
          <label>Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Estado</label>
          <select
            name="estado"
            className="form-control"
            value={form.estado}
            onChange={handleChange}
          >
            <option value="PRESENTE">Presente</option>
            <option value="AUSENTE">Ausente</option>
            <option value="LICENCIA">Licencia</option>
          </select>
        </div>

        <button className="btn btn-success">Guardar</button>
        <button
          type="button"
          onClick={() => navigate("/asistencias")}
          className="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
