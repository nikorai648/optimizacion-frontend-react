// src/api/desempenos.js
import { api } from "./client";

export async function getDesempenos() {
  try {
    const res = await api.get("/api/desempenos/");
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar desempeños");
  }
}

export async function getDesempeno(id) {
  try {
    const res = await api.get(`/api/desempenos/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar desempeño");
  }
}

export async function createDesempeno(data) {
  try {
    const res = await api.post("/api/desempenos/", data);
    return res.data;
  } catch (err) {
    console.error("Error creación desempeño:", err?.response?.data);
    throw new Error("Error al crear desempeño");
  }
}

export async function updateDesempeno(id, data) {
  try {
    const res = await api.put(`/api/desempenos/${id}/`, data);
    return res.data;
  } catch (err) {
    console.error("Error actualización desempeño:", err?.response?.data);
    throw new Error("Error al actualizar desempeño");
  }
}

export async function deleteDesempeno(id) {
  try {
    await api.delete(`/api/desempenos/${id}/`);
    return true;
  } catch (err) {
    throw new Error("Error al eliminar desempeño");
  }
}
