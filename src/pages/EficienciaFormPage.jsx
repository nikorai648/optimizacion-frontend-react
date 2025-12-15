import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEficiencia, getEficiencia, updateEficiencia } from "../api/eficiencias";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  id_eficiencia: "",
  trabajos_completados_en_1_mes: 0,
  sueldo_promedio_informado: 0,
};

export default function EficienciaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(esEditar);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!esEditar) return setLoading(false);

    getEficiencia(id)
      .then((data) => {
        setForm({
          trabajador_rut: data.trabajador_rut || "",
          trabajador_nombre: data.trabajador_nombre || "",
          id_eficiencia: data.id_eficiencia ?? "",
          trabajos_completados_en_1_mes: data.trabajos_completados_en_1_mes ?? 0,
          sueldo_promedio_informado: data.sueldo_promedio_informado ?? 0,
        });
      })
      .catch(() => setError("No se pudo cargar eficiencia"))
      .finally(() => setLoading(false));
  }, [id, esEditar]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      id_eficiencia: Number(form.id_eficiencia),
      trabajos_completados_en_1_mes: Number(form.trabajos_completados_en_1_mes),
      sueldo_promedio_informado: Number(form.sueldo_promedio_informado),
    };

    try {
      esEditar ? await updateEficiencia(id, payload) : await createEficiencia(payload);
      navigate("/eficiencias");
    } catch {
      setError("Error al guardar eficiencia");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar" : "Nueva"} Eficiencia</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {Object.keys(initialForm).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key.replaceAll("_", " ")}</label>
            <input
              className="form-control"
              name={key}
              value={form[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className="btn btn-success me-2" disabled={saving}>
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/eficiencias")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
