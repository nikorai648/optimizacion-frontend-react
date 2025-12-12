// src/pages/SueldoFormPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSueldo, getSueldo, updateSueldo } from "../api/sueldos";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  mes: "",                    // formato "2025-11"
  cantidad_trabajos_mes: 0,
  tipo_trabajos_mes: "",
  sueldo_total_mes: 0,
  id_eficiencia_asociada: "",
};

export default function SueldoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const esEditar = Boolean(id);

  useEffect(() => {
    if (esEditar) {
      getSueldo(id)
        .then((data) => setForm({
          ...data,
          // asegurar strings para inputs controlados
          mes: data.mes || "",
          id_eficiencia_asociada: data.id_eficiencia_asociada ?? "",
        }))
        .catch(() => setError("No se pudo cargar el sueldo"));
    }
  }, [id, esEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    if (!form.trabajador_rut || !form.trabajador_nombre || !form.mes) {
      return "RUT, nombre y mes son obligatorios.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validar();
    if (msg) {
      setError(msg);
      return;
    }

    setError("");

    // opcional: payload, aquí dejamos que DRF parsee strings a números/decimal
    const payload = {
      ...form,
      id_eficiencia_asociada:
        form.id_eficiencia_asociada === ""
          ? null
          : form.id_eficiencia_asociada,
    };

    try {
      if (esEditar) {
        await updateSueldo(id, payload);
      } else {
        await createSueldo(payload);
      }
      navigate("/sueldos");
    } catch (err) {
      setError("Error guardando sueldo");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Sueldo" : "Nuevo Sueldo"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">RUT Trabajador</label>
          <input
            name="trabajador_rut"
            className="form-control"
            value={form.trabajador_rut}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre Trabajador</label>
          <input
            name="trabajador_nombre"
            className="form-control"
            value={form.trabajador_nombre}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Mes</label>
          <input
            type="month"
            name="mes"
            className="form-control"
            value={form.mes}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Cantidad trabajos en el mes</label>
          <input
            type="number"
            min="0"
            name="cantidad_trabajos_mes"
            className="form-control"
            value={form.cantidad_trabajos_mes}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Tipo de trabajos del mes</label>
          <input
            name="tipo_trabajos_mes"
            className="form-control"
            value={form.tipo_trabajos_mes}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sueldo total del mes</label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="sueldo_total_mes"
            className="form-control"
            value={form.sueldo_total_mes}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">ID eficiencia asociada (opcional)</label>
          <input
            type="number"
            name="id_eficiencia_asociada"
            className="form-control"
            value={form.id_eficiencia_asociada}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-success me-2">Guardar</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/sueldos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
