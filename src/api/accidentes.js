// src/api/accidentes.js
import { api } from "./client";

export async function getAccidentes() {
  try {
    const res = await api.get("/api/accidentes/");
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar accidentes");
  }
}

export async function getAccidente(id) {
  try {
    const res = await api.get(`/api/accidentes/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error("No se pudo cargar accidente");
  }
}

export async function createAccidente(data) {
  try {
    const res = await api.post("/api/accidentes/", data);
    return res.data;
  } catch (err) {
    console.error("Error creación accidente:", err?.response?.data);
    throw new Error("Error al crear accidente");
  }
}

export async function updateAccidente(id, data) {
  try {
    const res = await api.put(`/api/accidentes/${id}/`, data);
    return res.data;
  } catch (err) {
    console.error("Error actualización accidente:", err?.response?.data);
    throw new Error("Error al actualizar accidente");
  }
}

export async function deleteAccidente(id) {
  try {
    await api.delete(`/api/accidentes/${id}/`);
    return true;
  } catch (err) {
    throw new Error("Error al eliminar accidente");
  }
}
