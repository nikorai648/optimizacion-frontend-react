// src/api/asistencias.js
import { API_URL, getAuthHeaders } from "./config";

// OBTENER LISTA
export async function getAsistencias() {
  const res = await fetch(`${API_URL}/api/asistencias/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Error al cargar asistencias");
  return res.json();
}

// OBTENER UNA
export async function getAsistencia(id) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("No se pudo obtener asistencia");
  return res.json();
}

// CREAR
export async function createAsistencia(data) {
  const res = await fetch(`${API_URL}/api/asistencias/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear asistencia");
  return res.json();
}

// ACTUALIZAR
export async function updateAsistencia(id, data) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar asistencia");
  return res.json();
}

// ELIMINAR
export async function deleteAsistencia(id) {
  const res = await fetch(`${API_URL}/api/asistencias/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Error al eliminar asistencia");
  return true;
}
