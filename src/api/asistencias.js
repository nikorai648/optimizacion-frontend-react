// src/api/asistencias.js
import { api } from "./client";

export async function getAsistencias() {
  try {
    const res = await api.get("/api/asistencias/");
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar asistencias");
  }
}

export async function getAsistencia(id) {
  try {
    const res = await api.get(`/api/asistencias/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error("No se pudo obtener asistencia");
  }
}

export async function createAsistencia(data) {
  try {
    const res = await api.post("/api/asistencias/", data);
    return res.data;
  } catch (err) {
    console.error("Error creación asistencia:", err?.response?.data);
    throw new Error("Error al crear asistencia");
  }
}

export async function updateAsistencia(id, data) {
  try {
    const res = await api.put(`/api/asistencias/${id}/`, data);
    return res.data;
  } catch (err) {
    console.error("Error actualización asistencia:", err?.response?.data);
    throw new Error("Error al actualizar asistencia");
  }
}

export async function deleteAsistencia(id) {
  try {
    await api.delete(`/api/asistencias/${id}/`);
    return true;
  } catch (err) {
    throw new Error("Error al eliminar asistencia");
  }
}
