import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTrabajador, getTrabajador, updateTrabajador } from "../api/trabajadores";

const initialForm = {
  rut: "",
  nombre: "",
  apellido: "",

  // si tu modelo realmente los tiene, déjalos
  fecha_nacimiento: "",
  email: "",
  rol_cargo: "",
  tipo_contrato: "",

  // ✅ OBLIGATORIOS (según tu error actual)
  fecha_ingreso: "",
  estado: "ACTIVO",

  turno: "DIURNO",
  tipo: "",
};

export default function TrabajadorFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(esEditar);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;

    const cargar = async () => {
      if (!esEditar) {
        setForm(initialForm);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const data = await getTrabajador(id);
        if (cancel) return;

        setForm({
          rut: data?.rut || "",
          nombre: data?.nombre || "",
          apellido: data?.apellido || "",

          fecha_nacimiento: data?.fecha_nacimiento || "",
          email: data?.email || "",
          rol_cargo: data?.rol_cargo || "",
          tipo_contrato: data?.tipo_contrato || "",

          // ✅ IMPORTANTES
          fecha_ingreso: data?.fecha_ingreso || "",
          estado: data?.estado || "ACTIVO",

          turno: data?.turno || "DIURNO",
          tipo: data?.tipo || "",
        });
      } catch (err) {
        console.error(err);
        if (!cancel) setError(err.message || "No se pudo cargar el trabajador");
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    cargar();
    return () => { cancel = true; };
  }, [id, esEditar]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validar = () => {
    if (!form.rut || !form.nombre || !form.apellido) {
      return "RUT, nombre y apellido son obligatorios.";
    }
    if (!form.fecha_ingreso || !form.estado) {
      return "Fecha de ingreso y estado son obligatorios.";
    }
    if (form.rut.length < 8) return "RUT demasiado corto.";
    if (form.email && !form.email.includes("@")) return "Email inválido.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validar();
    if (msg) return setError(msg);

    setSaving(true);
    setError("");
    try {
      if (esEditar) await updateTrabajador(id, form);
      else await createTrabajador(form);

      navigate("/trabajadores");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error guardando trabajador");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Trabajador" : "Nuevo Trabajador"}</h3>

      {loading && <div>Cargando...</div>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && (
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label" htmlFor="rut">RUT</label>
            <input id="rut" name="rut" className="form-control" value={form.rut} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="apellido">Apellido</label>
            <input id="apellido" name="apellido" className="form-control" value={form.apellido} onChange={handleChange} required />
          </div>

          {/* (opcionales si existen en tu modelo) */}
          <div className="col-md-6">
            <label className="form-label" htmlFor="fecha_nacimiento">Fecha nacimiento</label>
            <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" className="form-control" value={form.fecha_nacimiento} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className="form-control" value={form.email} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="rol_cargo">Rol / Cargo</label>
            <input id="rol_cargo" name="rol_cargo" className="form-control" value={form.rol_cargo} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="tipo_contrato">Tipo contrato</label>
            <input id="tipo_contrato" name="tipo_contrato" className="form-control" value={form.tipo_contrato} onChange={handleChange} />
          </div>

          {/* ✅ OBLIGATORIOS reales */}
          <div className="col-md-6">
            <label className="form-label" htmlFor="fecha_ingreso">Fecha ingreso</label>
            <input
              id="fecha_ingreso"
              name="fecha_ingreso"
              type="date"
              className="form-control"
              value={form.fecha_ingreso}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              className="form-select"
              value={form.estado}
              onChange={handleChange}
              required
            >
              <option value="ACTIVO">ACTIVO</option>
              <option value="INACTIVO">INACTIVO</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="turno">Turno</label>
            <select id="turno" name="turno" className="form-select" value={form.turno} onChange={handleChange}>
              <option value="DIURNO">Diurno</option>
              <option value="NOCTURNO">Nocturno</option>
              <option value="ROTATIVO">Rotativo</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="tipo">Tipo</label>
            <input id="tipo" name="tipo" className="form-control" value={form.tipo} onChange={handleChange} />
          </div>

          <div className="col-12 mt-3">
            <button className="btn btn-success me-2" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/trabajadores")} disabled={saving}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
