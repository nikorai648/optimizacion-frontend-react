import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDesempeno, getDesempeno, updateDesempeno } from "../api/desempenos";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  id_desempeno: 1,
  forma_de_hacer_trabajos: "",
  posibles_quejas: "",
};

export default function DesempenoFormPage() {
  const { id } = useParams();
  const esEditar = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!esEditar) return;
    getDesempeno(id)
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
      esEditar ? await updateDesempeno(id, form) : await createDesempeno(form);
      navigate("/desempenos");
    } catch (e2) {
      setError(e2.message || "Error guardando");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-8">
      <h3>{esEditar ? "Editar Desempeño" : "Nuevo Desempeño"}</h3>
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
          <label className="form-label">ID desempeño</label>
          <input type="number" min="1" className="form-control" name="id_desempeno" value={form.id_desempeno} onChange={handleChange} required />
        </div>

        <div className="col-12">
          <label className="form-label">Forma de hacer trabajos</label>
          <input className="form-control" name="forma_de_hacer_trabajos" value={form.forma_de_hacer_trabajos || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Posibles quejas</label>
          <input className="form-control" name="posibles_quejas" value={form.posibles_quejas || ""} onChange={handleChange} />
        </div>

        <div className="col-12">
          <button className="btn btn-success me-2" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/desempenos")} disabled={saving}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
