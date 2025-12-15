import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAsistencia, getAsistencia, updateAsistencia } from "../api/asistencias";
import { getTrabajadores } from "../api/trabajadores";

const initialForm = {
  trabajador: "",
  fecha: "",
  estado: "PRESENTE",
};

export default function AsistenciaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [trabajadores, setTrabajadores] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(esEditar);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;

    const cargar = async () => {
      setError("");

      try {
        const ts = await getTrabajadores();
        if (!cancel) setTrabajadores(Array.isArray(ts) ? ts : []);
      } catch (err) {
        console.error(err);
        if (!cancel) setError("No se pudieron cargar trabajadores");
      }

      if (esEditar) {
        setLoading(true);
        try {
          const data = await getAsistencia(id);
          if (cancel) return;
          setForm({
            trabajador: data?.trabajador ?? "",
            fecha: data?.fecha || "",
            estado: data?.estado || data?.tipo_jornada || "PRESENTE",
          });
        } catch (err) {
          console.error(err);
          if (!cancel) setError("No se pudo cargar la asistencia");
        } finally {
          if (!cancel) setLoading(false);
        }
      } else {
        setLoading(false);
        setForm(initialForm);
      }
    };

    cargar();
    return () => { cancel = true; };
  }, [id, esEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.trabajador || !form.fecha) {
      return setError("Trabajador y fecha son obligatorios.");
    }

    setSaving(true);
    try {
      if (esEditar) await updateAsistencia(id, form);
      else await createAsistencia(form);
      navigate("/asistencias");
    } catch (err) {
      console.error(err);
      setError("Error al guardar asistencia");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Asistencia" : "Nueva Asistencia"}</h3>

      {loading && <div>Cargando...</div>}
      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Trabajador</label>
            <select
              name="trabajador"
              className="form-select"
              value={form.trabajador}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione</option>
              {trabajadores.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre} {t.apellido} ({t.rut})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              name="estado"
              className="form-select"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="PRESENTE">Presente</option>
              <option value="AUSENTE">Ausente</option>
              <option value="LICENCIA">Licencia</option>
            </select>
          </div>

          <button className="btn btn-success me-2" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/asistencias")}
            className="btn btn-secondary"
            disabled={saving}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}
