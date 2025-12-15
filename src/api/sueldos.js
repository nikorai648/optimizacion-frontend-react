// src/api/sueldos.js
import { api } from "./client";

export async function getSueldos() {
  try {
    const res = await api.get("/api/sueldos/");
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar sueldos");
  }
}

export async function getSueldo(id) {
  try {
    const res = await api.get(`/api/sueldos/${id}/`);
    return res.data;
  } catch (err) {
    throw new Error("Error al cargar sueldo");
  }
}

export async function createSueldo(data) {
  try {
    const res = await api.post("/api/sueldos/", data);
    return res.data;
  } catch (err) {
    console.error("Error creación sueldo:", err?.response?.data);
    throw new Error("Error al crear sueldo");
  }
}

export async function updateSueldo(id, data) {
  try {
    const res = await api.put(`/api/sueldos/${id}/`, data);
    return res.data;
  } catch (err) {
    console.error("Error actualización sueldo:", err?.response?.data);
    throw new Error("Error al actualizar sueldo");
  }
}

export async function deleteSueldo(id) {
  try {
    await api.delete(`/api/sueldos/${id}/`);
    return true;
  } catch (err) {
    throw new Error("Error al eliminar sueldo");
  }
}
