// src/pages/DesempenoFormPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDesempeno,
  getDesempeno,
  updateDesempeno,
} from "../api/desempenos";

const initialForm = {
  trabajador_rut: "",
  trabajador_nombre: "",
  id_desempeno: "",
  forma_de_hacer_trabajos: "",
  posibles_quejas: "",
};

export default function DesempenoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const esEditar = Boolean(id);

  useEffect(() => {
    if (esEditar) {
      getDesempeno(id)
        .then((data) => {
          setForm({
            trabajador_rut: data.trabajador_rut || "",
            trabajador_nombre: data.trabajador_nombre || "",
            id_desempeno: data.id_desempeno ?? "",
            forma_de_hacer_trabajos: data.forma_de_hacer_trabajos || "",
            posibles_quejas: data.posibles_quejas || "",
          });
        })
        .catch((err) => {
          console.error(err);
          setError("No se pudo cargar el desempeño");
        });
    }
  }, [id, esEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    if (!form.trabajador_rut || !form.trabajador_nombre) {
      return "RUT y nombre del trabajador son obligatorios.";
    }
    if (!form.id_desempeno) {
      return "Debe indicar un ID de desempeño.";
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

    try {
      if (esEditar) {
        await updateDesempeno(id, form);
      } else {
        await createDesempeno(form);
      }
      navigate("/desempenos");
    } catch (err) {
      console.error(err);
      setError("Error guardando desempeño");
    }
  };

  return (
    <div className="container mt-4 col-md-6">
      <h3>{esEditar ? "Editar Desempeño" : "Nuevo Desempeño"}</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">RUT trabajador</label>
          <input
            name="trabajador_rut"
            className="form-control"
            value={form.trabajador_rut}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nombre trabajador</label>
          <input
            name="trabajador_nombre"
            className="form-control"
            value={form.trabajador_nombre}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">ID Desempeño</label>
          <input
            name="id_desempeno"
            type="number"
            className="form-control"
            value={form.id_desempeno}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Forma de hacer trabajos</label>
          <input
            name="forma_de_hacer_trabajos"
            className="form-control"
            value={form.forma_de_hacer_trabajos}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Posibles quejas</label>
          <input
            name="posibles_quejas"
            className="form-control"
            value={form.posibles_quejas}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-3">
          <button className="btn btn-success me-2">Guardar</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/desempenos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
