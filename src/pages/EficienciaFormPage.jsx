import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEficiencia, getEficiencia, updateEficiencia } from "../api/eficiencias";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  id_eficiencia: 1,
  trabajos_completados_en_1_mes: 0,
  sueldo_promedio_informado: 0,
};

export default function EficienciaFormPage() {
  const { id } = useParams();
  const esEditar = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!esEditar) return;
    getEficiencia(id)
      .then((data) => setForm({ ...initialForm, ...data }))
      .catch((e) => setError(e.message || "No se pudo cargar"));
  }, [id, esEditar]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const v = type === "number" ? Number(value) : value;
    setForm((p) => ({ ...p, [name]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      esEditar ? await updateEficiencia(id, form) : await createEficiencia(form);
      navigate("/eficiencias");
    } catch (e2) {
      setError(e2.message || "Error guardando");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-8">
      <h3>{esEditar ? "Editar Eficiencia" : "Nueva Eficiencia"}</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Trabajador RUT</label>
          <input className="form-control" name="trabajador_rut" value={form.trabajador_rut} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Trabajador Nombre</label>
          <input className="form-control" name="trabajador_nombre" value={form.trabajador_nombre} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">ID eficiencia</label>
          <input type="number" min="1" className="form-control" name="id_eficiencia" value={form.id_eficiencia} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Trabajos completados (1 mes)</label>
          <input type="number" min="0" className="form-control" name="trabajos_completados_en_1_mes" value={form.trabajos_completados_en_1_mes} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Sueldo promedio informado</label>
          <input type="number" min="0" className="form-control" name="sueldo_promedio_informado" value={form.sueldo_promedio_informado} onChange={handleChange} />
        </div>

        <div className="col-12">
          <button className="btn btn-success me-2" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/eficiencias")} disabled={saving}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
