import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTrabajador, getTrabajador, updateTrabajador } from "../api/trabajadores";

const initialForm = {
  rut: "",
  nombre: "",
  apellido: "",

  fecha_nacimiento: "",
  email: "",
  telefono: "",

  rol_cargo: "",
  tipo_contrato: "",
  area: "",

  turno: "DIURNO",
  fecha_ingreso: "",
  sueldo_base: 0,

  estado: "ACTIVO",
  contacto_emergencia: "",
  telefono_emergencia: "",
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
          rut: data?.rut ?? "",
          nombre: data?.nombre ?? "",
          apellido: data?.apellido ?? "",

          fecha_nacimiento: data?.fecha_nacimiento ?? "",
          email: data?.email ?? "",
          telefono: data?.telefono ?? "",

          rol_cargo: data?.rol_cargo ?? "",
          tipo_contrato: data?.tipo_contrato ?? "",
          area: data?.area ?? "",

          turno: data?.turno ?? "DIURNO",
          fecha_ingreso: data?.fecha_ingreso ?? "",
          sueldo_base: data?.sueldo_base ?? 0,

          estado: data?.estado ?? "ACTIVO",
          contacto_emergencia: data?.contacto_emergencia ?? "",
          telefono_emergencia: data?.telefono_emergencia ?? "",
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    if (!form.rut || !form.nombre || !form.apellido) {
      return "RUT, nombre y apellido son obligatorios.";
    }
    if (!form.rut.includes("-")) {
      return "El RUT debe incluir guion. Ej: 199952632-4";
    }
    if (!form.fecha_nacimiento || !form.fecha_ingreso) {
      return "Fecha nacimiento y fecha ingreso son obligatorias.";
    }
    if (!form.email || !form.email.includes("@")) {
      return "Email inválido.";
    }
    if (!form.rol_cargo || !form.tipo_contrato) {
      return "Rol/cargo y tipo contrato son obligatorios.";
    }
    if (!form.turno) {
      return "Turno es obligatorio.";
    }
    if (!["ACTIVO", "INACTIVO"].includes(form.estado)) {
      return "Estado debe ser ACTIVO o INACTIVO.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validar();
    if (msg) return setError(msg);

    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        sueldo_base: Number(form.sueldo_base || 0),
      };

      if (esEditar) await updateTrabajador(id, payload);
      else await createTrabajador(payload);

      navigate("/trabajadores");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error guardando trabajador");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-8">
      <h3>{esEditar ? "Editar Trabajador" : "Nuevo Trabajador"}</h3>

      {loading && <div>Cargando...</div>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && (
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label className="form-label">RUT *</label>
            <input name="rut" className="form-control" value={form.rut} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Nombre *</label>
            <input name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Apellido *</label>
            <input name="apellido" className="form-control" value={form.apellido} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Fecha nacimiento *</label>
            <input type="date" name="fecha_nacimiento" className="form-control" value={form.fecha_nacimiento} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Email *</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Teléfono</label>
            <input name="telefono" className="form-control" value={form.telefono} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Rol / Cargo *</label>
            <input name="rol_cargo" className="form-control" value={form.rol_cargo} onChange={handleChange} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tipo contrato *</label>
            <input name="tipo_contrato" className="form-control" value={form.tipo_contrato} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Área</label>
            <input name="area" className="form-control" value={form.area} onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Turno *</label>
            <select name="turno" className="form-select" value={form.turno} onChange={handleChange} required>
              <option value="DIURNO">DIURNO</option>
              <option value="NOCTURNO">NOCTURNO</option>
              <option value="ROTATIVO">ROTATIVO</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Fecha ingreso *</label>
            <input type="date" name="fecha_ingreso" className="form-control" value={form.fecha_ingreso} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label className="form-label">Sueldo base</label>
            <input type="number" step="0.01" min="0" name="sueldo_base" className="form-control" value={form.sueldo_base} onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">Estado *</label>
            <select name="estado" className="form-select" value={form.estado} onChange={handleChange} required>
              <option value="ACTIVO">ACTIVO</option>
              <option value="INACTIVO">INACTIVO</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Contacto emergencia</label>
            <input name="contacto_emergencia" className="form-control" value={form.contacto_emergencia} onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Teléfono emergencia</label>
            <input name="telefono_emergencia" className="form-control" value={form.telefono_emergencia} onChange={handleChange} />
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
