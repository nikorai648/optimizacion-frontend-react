// src/pages/EficienciaFormPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEficiencia,
  getEficiencia,
  updateEficiencia,
} from "../api/eficiencias";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  id_eficiencia: "",
  trabajos_completados_en_1_mes: "",
  sueldo_promedio_informado: "",
};

export default function EficienciaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const esEditar = Boolean(id);

  useEffect(() => {
    if (esEditar) {
      getEficiencia(id)
        .then((data) => setForm({
          trabajador_rut: data.trabajador_rut || "",
          trabajador_nombre: data.trabajador_nombre || "",
          id_eficiencia: data.id_eficiencia?.toString() || "",
          trabajos_completados_en_1_mes: data.trabajos_completados_en_1_mes?.toString() || "",
          sueldo_promedio_informado: data.sueldo_promedio_informado?.toString() || "",
        }))
        .catch(() => setError("No se pudo cargar la eficiencia"));
    }
  }, [id, esEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.trabajador_rut || !form.trabajador_nombre) {
      return "RUT y nombre del trabajador son obligatorios.";
    }
    if (!form.id_eficiencia) {
      return "ID de eficiencia es obligatorio.";
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

    // Convertir numéricos
    const payload = {
      trabajador_rut: form.trabajador_rut,
      trabajador_nombre: form.trabajador_nombre,
      id_eficiencia: Number(form.id_eficiencia || 0),
      trabajos_completados_en_1_mes: Number(form.trabajos_completados_en_1_mes || 0),
      sueldo_promedio_informado: Number(form.sueldo_promedio_informado || 0),
    };

    try {
      if (esEditar) {
        await updateEficiencia(id, payload);
      } else {
        await createEficiencia(payload);
      }
      navigate("/eficiencias");
    } catch (err) {
      setError("Error guardando eficiencia");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Eficiencia" : "Nueva Eficiencia"}</h3>

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
          <label className="form-label">ID Eficiencia</label>
          <input
            type="number"
            name="id_eficiencia"
            className="form-control"
            value={form.id_eficiencia}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Trabajos completados en 1 mes</label>
          <input
            type="number"
            name="trabajos_completados_en_1_mes"
            className="form-control"
            value={form.trabajos_completados_en_1_mes}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Sueldo promedio informado</label>
          <input
            type="number"
            name="sueldo_promedio_informado"
            className="form-control"
            value={form.sueldo_promedio_informado}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-success me-2">Guardar</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/eficiencias")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
