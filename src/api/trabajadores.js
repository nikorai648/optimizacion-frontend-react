// src/api/trabajadores.js
import { api } from "./client";

export async function getTrabajadores() {
  const res = await api.get("/api/trabajadores/");
  return res.data;
}

export async function getTrabajador(id) {
  const res = await api.get(`/api/trabajadores/${id}/`);
  return res.data;
}

export async function createTrabajador(data) {
  try {
    const res = await api.post("/api/trabajadores/", data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error creación trabajador:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function updateTrabajador(id, data) {
  try {
    const res = await api.put(`/api/trabajadores/${id}/`, data);
    return res.data;
  } catch (err) {
    const detail = err?.response?.data;
    console.error("Error actualización trabajador:", detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
}

export async function deleteTrabajador(id) {
  await api.delete(`/api/trabajadores/${id}/`);
  return true;
}
