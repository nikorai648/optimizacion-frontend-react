// src/api/accidentes.js
import { API_URL, getAuthHeaders } from "./config";

// LISTAR
export async function getAccidentes() {
  const res = await fetch(`${API_URL}/api/accidentes/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Error al cargar accidentes");
  return res.json();
}

// OBTENER UNO
export async function getAccidente(id) {
  const res = await fetch(`${API_URL}/api/accidentes/${id}/`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("No se pudo cargar accidente");
  return res.json();
}

// CREAR
export async function createAccidente(data) {
  const res = await fetch(`${API_URL}/api/accidentes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("Error creación accidente:", err);
    throw new Error("Error al crear accidente");
  }
  return res.json();
}

// ACTUALIZAR
export async function updateAccidente(id, data) {
  const res = await fetch(`${API_URL}/api/accidentes/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("Error actualización accidente:", err);
    throw new Error("Error al actualizar accidente");
  }
  return res.json();
}

// ELIMINAR
export async function deleteAccidente(id) {
  const res = await fetch(`${API_URL}/api/accidentes/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Error al eliminar accidente");
  return true;
}
