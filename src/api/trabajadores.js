// src/api/trabajadores.js
import { api } from "./client";

export async function getTrabajadores() {
  try {
    const res = await api.get("/api/trabajadores/");
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar trabajadores");
  }
}

export async function getTrabajador(id) {
  try {
    const res = await api.get(`/api/trabajadores/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar el trabajador");
  }
}

export async function createTrabajador(data) {
  try {
    const res = await api.post("/api/trabajadores/", data);
    return res.data;
  } catch (err) {
    console.error("Error creación trabajador:", err?.response?.data);
    throw new Error("Error al crear trabajador");
  }
}

export async function updateTrabajador(id, data) {
  try {
    const res = await api.put(`/api/trabajadores/${id}/`, data);
    return res.data;
  } catch (err) {
    console.error("Error actualización trabajador:", err?.response?.data);
    throw new Error("Error al actualizar trabajador");
  }
}

export async function deleteTrabajador(id) {
  try {
    await api.delete(`/api/trabajadores/${id}/`);
    return true;
  } catch (err) {
    throw new Error("Error al eliminar trabajador");
  }
}
