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
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!esEditar) return;
    getSueldo(id).then(setForm).catch(() => setError("No se pudo cargar sueldo"));
  }, [id, esEditar]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      cantidad_trabajos_mes: Number(form.cantidad_trabajos_mes),
      sueldo_total_mes: Number(form.sueldo_total_mes),
      id_eficiencia_asociada: form.id_eficiencia_asociada || null,
    };

    try {
      esEditar ? await updateSueldo(id, payload) : await createSueldo(payload);
      navigate("/sueldos");
    } catch {
      setError("Error guardando sueldo");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar" : "Nuevo"} Sueldo</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {Object.keys(initialForm).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key.replaceAll("_", " ")}</label>
            <input
              name={key}
              className="form-control"
              value={form[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className="btn btn-success me-2">Guardar</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/sueldos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
