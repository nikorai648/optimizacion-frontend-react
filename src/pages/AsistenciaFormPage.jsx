import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAsistencia, getAsistencia, updateAsistencia } from "../api/asistencias";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  fecha: "",
  hora_entrada: "",
  hora_salida: "",
  minutos_atraso: 0,
  horas_extras: 0,
  estado: "PRESENTE",
  observaciones: "",
};

export default function AsistenciaFormPage() {
  const { id } = useParams();
  const esEditar = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!esEditar) return;
    getAsistencia(id)
      .then((data) => setForm({ ...initialForm, ...data }))
      .catch((e) => setError(e.message || "No se pudo cargar la asistencia"));
  }, [id, esEditar]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      esEditar ? await updateAsistencia(id, form) : await createAsistencia(form);
      navigate("/asistencias");
    } catch (e2) {
      setError(e2.message || "Error guardando asistencia");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-7">
      <h3>{esEditar ? "Editar Asistencia" : "Nueva Asistencia"}</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">RUT Trabajador</label>
          <input className="form-control" name="trabajador_rut" value={form.trabajador_rut} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre Trabajador</label>
          <input className="form-control" name="trabajador_nombre" value={form.trabajador_nombre} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={handleChange} required />
        </div>

        <div className="col-md-3">
          <label className="form-label">Hora entrada</label>
          <input type="time" className="form-control" name="hora_entrada" value={form.hora_entrada || ""} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Hora salida</label>
          <input type="time" className="form-control" name="hora_salida" value={form.hora_salida || ""} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Minutos atraso</label>
          <input type="number" min="0" className="form-control" name="minutos_atraso" value={form.minutos_atraso} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Horas extras</label>
          <input type="number" min="0" step="0.01" className="form-control" name="horas_extras" value={form.horas_extras} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <select className="form-select" name="estado" value={form.estado} onChange={handleChange}>
            <option value="PRESENTE">PRESENTE</option>
            <option value="AUSENTE">AUSENTE</option>
            <option value="LICENCIA">LICENCIA</option>
            <option value="VACACIONES">VACACIONES</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Observaciones</label>
          <input className="form-control" name="observaciones" value={form.observaciones || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <button className="btn btn-success me-2" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/asistencias")} disabled={saving}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
