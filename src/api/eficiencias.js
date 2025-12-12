// src/api/eficiencias.js
import { API_URL, getAuthHeaders } from "./config";

// LISTAR
export async function getEficiencias() {
  const res = await fetch(`${API_URL}/api/eficiencias/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar eficiencias");
  }
  return res.json();
}

// OBTENER UNA
export async function getEficiencia(id) {
  const res = await fetch(`${API_URL}/api/eficiencias/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al cargar eficiencia");
  }
  return res.json();
}

// CREAR
export async function createEficiencia(data) {
  const res = await fetch(`${API_URL}/api/eficiencias/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error creación eficiencia:", errorData);
    throw new Error("Error al crear eficiencia");
  }
  return res.json();
}

// ACTUALIZAR
export async function updateEficiencia(id, data) {
  const res = await fetch(`${API_URL}/api/eficiencias/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Error actualización eficiencia:", errorData);
    throw new Error("Error al actualizar eficiencia");
  }
  return res.json();
}

// ELIMINAR
export async function deleteEficiencia(id) {
  const res = await fetch(`${API_URL}/api/eficiencias/${id}/`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar eficiencia");
  }
  return true;
}
