import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAccidente, getAccidente, updateAccidente } from "../api/accidentes";

const initialForm = {
  fecha: "",
  tipo: "",
  gravedad: "LEVE",
  lugar: "",
  hora_suceso: "",
  descripcion: "",
  requiere_licencia: false,
  dias_licencia: 0,
  costo_estimado: "",
  reportado_a: "",
  observaciones: "",
  trabajadores_involucrados: "",
};

export default function AccidenteFormPage() {
  const { id } = useParams();
  const esEditar = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!esEditar) return;
    getAccidente(id)
      .then((data) => setForm({ ...initialForm, ...data }))
      .catch((e) => setError(e.message || "No se pudo cargar"));
  }, [id, esEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: checked }));
      return;
    }

    if (type === "number") {
      setForm((p) => ({ ...p, [name]: value === "" ? "" : Number(value) }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        // si no requiere licencia, forzamos 0
        dias_licencia: form.requiere_licencia ? Number(form.dias_licencia || 0) : 0,
        // costo puede ser null/blank
        costo_estimado: form.costo_estimado === "" ? null : form.costo_estimado,
      };

      esEditar ? await updateAccidente(id, payload) : await createAccidente(payload);
      navigate("/accidentes");
    } catch (e2) {
      setError(e2.message || "Error guardando");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-9">
      <h3>{esEditar ? "Editar Accidente" : "Nuevo Accidente"}</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label className="form-label">Fecha</label>
          <input type="date" className="form-control" name="fecha" value={form.fecha} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tipo</label>
          <input className="form-control" name="tipo" value={form.tipo} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Gravedad</label>
          <select className="form-select" name="gravedad" value={form.gravedad} onChange={handleChange} required>
            <option value="LEVE">LEVE</option>
            <option value="MODERADA">MODERADA</option>
            <option value="GRAVE">GRAVE</option>
            <option value="FATAL">FATAL</option>
          </select>
        </div>

        <div className="col-md-8">
          <label className="form-label">Lugar</label>
          <input className="form-control" name="lugar" value={form.lugar} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Hora suceso</label>
          <input type="time" className="form-control" name="hora_suceso" value={form.hora_suceso || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion || ""} onChange={handleChange} />
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="req" name="requiere_licencia" checked={!!form.requiere_licencia} onChange={handleChange} />
            <label className="form-check-label" htmlFor="req">Requiere licencia</label>
          </div>
        </div>

        <div className="col-md-3">
          <label className="form-label">Días licencia</label>
          <input type="number" min="0" className="form-control" name="dias_licencia" value={form.dias_licencia} onChange={handleChange} disabled={!form.requiere_licencia} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Costo estimado</label>
          <input type="number" min="0" step="0.01" className="form-control" name="costo_estimado" value={form.costo_estimado ?? ""} onChange={handleChange} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Reportado a</label>
          <input className="form-control" name="reportado_a" value={form.reportado_a || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Trabajadores involucrados (RUTs o nombres separados por coma)</label>
          <input className="form-control" name="trabajadores_involucrados" value={form.trabajadores_involucrados || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Observaciones</label>
          <input className="form-control" name="observaciones" value={form.observaciones || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <button className="btn btn-success me-2" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/accidentes")} disabled={saving}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
