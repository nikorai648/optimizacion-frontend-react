import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSueldo, getSueldo, updateSueldo } from "../api/sueldos";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  mes: "",
  cantidad_trabajos_mes: 0,
  tipo_trabajos_mes: "",
  sueldo_total_mes: 0,
  id_eficiencia_asociada: "",
};

export default function SueldoFormPage() {
  const { id } = useParams();
  const esEditar = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!esEditar) return;
    getSueldo(id)
      .then((data) => setForm({ ...initialForm, ...data }))
      .catch((e) => setError(e.message || "No se pudo cargar"));
  }, [id, esEditar]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
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
        id_eficiencia_asociada:
          form.id_eficiencia_asociada === "" ? null : Number(form.id_eficiencia_asociada),
      };

      esEditar ? await updateSueldo(id, payload) : await createSueldo(payload);
      navigate("/sueldos");
    } catch (e2) {
      setError(e2.message || "Error guardando");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-9">
      <h3>{esEditar ? "Editar Sueldo" : "Nuevo Sueldo"}</h3>
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
          <label className="form-label">Mes (YYYY-MM)</label>
          <input className="form-control" name="mes" placeholder="2025-11" value={form.mes} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Cantidad trabajos mes</label>
          <input type="number" min="0" className="form-control" name="cantidad_trabajos_mes" value={form.cantidad_trabajos_mes} onChange={handleChange} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Sueldo total mes</label>
          <input type="number" min="0" step="0.01" className="form-control" name="sueldo_total_mes" value={form.sueldo_total_mes} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Tipo trabajos mes</label>
          <input className="form-control" name="tipo_trabajos_mes" value={form.tipo_trabajos_mes} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">ID eficiencia asociada (opcional)</label>
          <input type="number" min="0" className="form-control" name="id_eficiencia_asociada" value={form.id_eficiencia_asociada ?? ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <button className="btn btn-success me-2" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/sueldos")} disabled={saving}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
