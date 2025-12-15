import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAccidente, getAccidente, updateAccidente } from "../api/accidentes";
import { getTrabajadores } from "../api/trabajadores";

const initialForm = {
  trabajador: "",       // id trabajador
  fecha: "",
  tipo: "",
  gravedad: "LEVE",
  lugar: "",
  requiere_licencia: false,
  dias_licencia: 0,
  observaciones: "",
};

export default function AccidenteFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEditar = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(esEditar);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;

    const cargarTodo = async () => {
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
          const data = await getAccidente(id);
          if (cancel) return;

          setForm({
            trabajador: data?.trabajador ?? "",
            fecha: data?.fecha || "",
            tipo: data?.tipo || data?.descripcion || "",
            gravedad: data?.gravedad || "LEVE",
            lugar: data?.lugar || "",
            requiere_licencia: !!data?.requiere_licencia,
            dias_licencia: data?.dias_licencia ?? 0,
            observaciones: data?.observaciones || "",
          });
        } catch (err) {
          console.error(err);
          if (!cancel) setError("No se pudo cargar el accidente");
        } finally {
          if (!cancel) setLoading(false);
        }
      } else {
        setLoading(false);
        setForm(initialForm);
      }
    };

    cargarTodo();
    return () => { cancel = true; };
  }, [id, esEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.trabajador || !form.fecha || !form.tipo) {
      return setError("Trabajador, fecha y tipo son obligatorios.");
    }

    const payload = {
      ...form,
      dias_licencia: Number(form.dias_licencia) || 0,
    };

    setSaving(true);
    try {
      if (esEditar) await updateAccidente(id, payload);
      else await createAccidente(payload);
      navigate("/accidentes");
    } catch (err) {
      console.error(err);
      setError("Error al guardar accidente");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Accidente" : "Nuevo Accidente"}</h3>

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
              name="fecha"
              className="form-control"
              value={form.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de accidente</label>
            <input
              name="tipo"
              className="form-control"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Caída, golpe, etc."
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gravedad</label>
            <select
              name="gravedad"
              className="form-select"
              value={form.gravedad}
              onChange={handleChange}
            >
              <option value="LEVE">Leve</option>
              <option value="MODERADA">Moderada</option>
              <option value="GRAVE">Grave</option>
              <option value="FATAL">Fatal</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Lugar</label>
            <input
              name="lugar"
              className="form-control"
              value={form.lugar}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="requiere_licencia"
              name="requiere_licencia"
              checked={form.requiere_licencia}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="requiere_licencia">
              Requiere licencia
            </label>
          </div>

          {form.requiere_licencia && (
            <div className="mb-3">
              <label className="form-label">Días de licencia</label>
              <input
                type="number"
                min="0"
                name="dias_licencia"
                className="form-control"
                value={form.dias_licencia}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Observaciones</label>
            <textarea
              name="observaciones"
              className="form-control"
              rows="2"
              value={form.observaciones}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-success me-2" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/accidentes")}
            disabled={saving}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}
