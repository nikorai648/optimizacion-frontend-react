// src/api/eficiencias.js
import { api } from "./client";

export async function getEficiencias() {
  try {
    const res = await api.get("/api/eficiencias/");
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar eficiencias");
  }
}

export async function getEficiencia(id) {
  try {
    const res = await api.get(`/api/eficiencias/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar eficiencia");
  }
}

export async function createEficiencia(data) {
  try {
    const res = await api.post("/api/eficiencias/", data);
    return res.data;
  } catch (err) {
    console.error("Error creación eficiencia:", err?.response?.data);
    throw new Error("Error al crear eficiencia");
  }
}

export async function updateEficiencia(id, data) {
  try {
    const res = await api.put(`/api/eficiencias/${id}/`, data);
    return res.data;
  } catch (err) {
    console.error("Error actualización eficiencia:", err?.response?.data);
    throw new Error("Error al actualizar eficiencia");
  }
}

export async function deleteEficiencia(id) {
  try {
    await api.delete(`/api/eficiencias/${id}/`);
    return true;
  } catch (err) {
    throw new Error("Error al eliminar eficiencia");
  }
}
